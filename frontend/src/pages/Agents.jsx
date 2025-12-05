import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Plus, Play, Settings, Trash2, Loader2, Power, Clock, CheckCircle, XCircle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import Alert from '../components/common/Alert';
import { useAgentStore } from '../store/agentStore';

const Agents = () => {
  const navigate = useNavigate();
  const { agents, loading, error, loadAgents, deleteAgent, toggleAgentStatus } = useAgentStore();
  
  const [showModal, setShowModal] = useState(false);
  const [executing, setExecuting] = useState({});
  const [alert, setAlert] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    agent_type: 'web_search',
    project_id: null,
    mcp_servers: []
  });

  useEffect(() => {
    loadAgents();
  }, []);

  const agentTemplates = [
    { type: 'web_search', name: 'Web Search', icon: '🔍', color: 'blue' },
    { type: 'code_review', name: 'Code Review', icon: '👁️', color: 'purple' },
    { type: 'code_generator', name: 'Code Generator', icon: '⚡', color: 'yellow' },
    { type: 'deploy', name: 'Deployer', icon: '🚀', color: 'green' },
    { type: 'test_e2e', name: 'E2E Tester', icon: '🧪', color: 'orange' },
    { type: 'monitoring', name: 'Monitor', icon: '📊', color: 'red' },
    { type: 'gmail', name: 'Gmail', icon: '📧', color: 'indigo' },
  ];

  const createAgent = async (e) => {
    e.preventDefault();
    try {
      await useAgentStore.getState().createAgent(formData);
      showAlert('success', 'Agent created successfully');
      setShowModal(false);
      resetForm();
    } catch (error) {
      showAlert('error', error.response?.data?.detail || 'Failed to create agent');
    }
  };

  const handleDeleteAgent = async (agentId) => {
    if (!confirm('Delete this agent and all its execution history?')) return;

    try {
      await deleteAgent(agentId);
      showAlert('success', 'Agent deleted');
    } catch (error) {
      showAlert('error', 'Failed to delete agent');
    }
  };

  const handleToggleAgent = async (agentId) => {
    try {
      await toggleAgentStatus(agentId);
      showAlert('success', 'Agent status updated');
    } catch (error) {
      showAlert('error', 'Failed to update agent status');
    }
  };

  const executeAgent = async (agent) => {
    setExecuting(prev => ({ ...prev, [agent.id]: true }));
    
    try {
      // Navigate to agent execution page
      navigate(`/agents/${agent.id}/execute`);
    } catch (error) {
      showAlert('error', 'Failed to execute agent');
    } finally {
      setExecuting(prev => ({ ...prev, [agent.id]: false }));
    }
  };

  const configureAgent = (agent) => {
    navigate(`/agents/${agent.id}/settings`);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      agent_type: 'web_search',
      project_id: null,
      mcp_servers: []
    });
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const getAgentStatusIcon = (agent) => {
    if (!agent.is_active) return <Power size={16} style={{ color: 'var(--gray-400)' }} />;
    // Could check last execution status here
    return <CheckCircle size={16} style={{ color: 'var(--success)' }} />;
  };

  if (loading && agents.length === 0) {
    return (
      <Layout>
        <Loading message="Loading agents..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container" style={{ padding: 'var(--spacing-8) var(--spacing-4)' }}>
        {alert && (
          <div style={{ marginBottom: 'var(--spacing-4)' }}>
            <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
          </div>
        )}

        <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-8)' }}>
          <div>
            <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: '700', marginBottom: 'var(--spacing-2)' }}>
              <Bot style={{ display: 'inline', marginRight: 'var(--spacing-2)' }} />
              Agents Autonomes
            </h1>
            <p style={{ color: 'var(--gray-600)' }}>
              Automatisez vos workflows avec des agents MCP-powered
            </p>
          </div>
          <Button variant="primary" icon={Plus} onClick={() => setShowModal(true)}>
            Créer un Agent
          </Button>
        </div>

        {/* Quick Templates */}
        <div style={{ marginBottom: 'var(--spacing-8)' }}>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: '600', marginBottom: 'var(--spacing-3)' }}>
            Templates rapides
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', 
            gap: 'var(--spacing-3)' 
          }}>
            {agentTemplates.map(template => (
              <button
                key={template.type}
                className="card"
                style={{
                  padding: 'var(--spacing-4)',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  border: '2px solid transparent'
                }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                onMouseOut={(e) => e.currentTarget.style.borderColor = 'transparent'}
                onClick={() => {
                  setFormData({ ...formData, agent_type: template.type, name: template.name });
                  setShowModal(true);
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-2)' }}>
                  {template.icon}
                </div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: '500' }}>
                  {template.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Agents List */}
        <div>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: '600', marginBottom: 'var(--spacing-3)' }}>
            Mes Agents
          </h2>
          
          {agents.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: 'var(--spacing-8)' }}>
              <Bot size={48} style={{ color: 'var(--gray-400)', margin: '0 auto var(--spacing-4)' }} />
              <p style={{ color: 'var(--gray-600)', marginBottom: 'var(--spacing-4)' }}>
                Aucun agent créé. Créez votre premier agent autonome !
              </p>
              <Button variant="primary" icon={Plus} onClick={() => setShowModal(true)}>
                Créer mon premier Agent
              </Button>
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
              gap: 'var(--spacing-4)' 
            }}>
              {agents.map(agent => {
                const template = agentTemplates.find(t => t.type === agent.agent_type);
                
                return (
                  <div key={agent.id} className="card" style={{ padding: 'var(--spacing-4)' }}>
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: 'var(--spacing-3)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                        <div style={{ fontSize: '2rem' }}>{template?.icon || '🤖'}</div>
                        <div>
                          <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: '600', marginBottom: 'var(--spacing-1)' }}>
                            {agent.name}
                          </h3>
                          <span style={{ 
                            fontSize: 'var(--text-xs)', 
                            color: 'var(--gray-500)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>
                            {template?.name || agent.agent_type}
                          </span>
                        </div>
                      </div>
                      {getAgentStatusIcon(agent)}
                    </div>

                    {/* Description */}
                    {agent.description && (
                      <p style={{ 
                        fontSize: 'var(--text-sm)', 
                        color: 'var(--gray-600)', 
                        marginBottom: 'var(--spacing-3)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {agent.description}
                      </p>
                    )}

                    {/* Stats */}
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '1fr 1fr', 
                      gap: 'var(--spacing-2)',
                      marginBottom: 'var(--spacing-3)',
                      padding: 'var(--spacing-3)',
                      backgroundColor: 'var(--gray-50)',
                      borderRadius: 'var(--radius-md)'
                    }}>
                      <div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-600)', marginBottom: 'var(--spacing-1)' }}>
                          MCP Servers
                        </div>
                        <div style={{ fontSize: 'var(--text-sm)', fontWeight: '600' }}>
                          {agent.config?.mcp_servers?.length || 0}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-600)', marginBottom: 'var(--spacing-1)' }}>
                          Executions
                        </div>
                        <div style={{ fontSize: 'var(--text-sm)', fontWeight: '600' }}>
                          {agent.execution_count || 0}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => executeAgent(agent)}
                        disabled={!agent.is_active || executing[agent.id]}
                        style={{ flex: 1 }}
                      >
                        {executing[agent.id] ? (
                          <>
                            <Loader2 className="animate-spin" size={16} />
                            Executing...
                          </>
                        ) : (
                          <>
                            <Play size={16} />
                            Execute
                          </>
                        )}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => configureAgent(agent)}
                      >
                        <Settings size={16} />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleAgent(agent.id)}
                      >
                        <Power size={16} />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteAgent(agent.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Create Agent */}
        {showModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 'var(--spacing-4)'
          }}>
            <div className="card" style={{ width: '100%', maxWidth: '600px' }}>
              <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: '600', marginBottom: 'var(--spacing-6)' }}>
                Créer un Agent
              </h2>

              <form onSubmit={createAgent}>
                <div className="form-group">
                  <label className="form-label">Type d'Agent</label>
                  <select
                    className="form-input"
                    value={formData.agent_type}
                    onChange={(e) => setFormData({ ...formData, agent_type: e.target.value })}
                    required
                  >
                    {agentTemplates.map(template => (
                      <option key={template.type} value={template.type}>
                        {template.icon} {template.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Nom</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="e.g., Code Reviewer Pro"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description (optionnel)</label>
                  <textarea
                    className="form-textarea"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Décrivez ce que cet agent fait..."
                    rows={3}
                  />
                </div>

                <div style={{ display: 'flex', gap: 'var(--spacing-3)', justifyContent: 'flex-end', marginTop: 'var(--spacing-6)' }}>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                  >
                    Annuler
                  </Button>
                  <Button type="submit" variant="primary">
                    Créer l'Agent
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Agents;