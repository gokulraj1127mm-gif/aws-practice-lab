import React, { useState, useRef, useEffect } from 'react';
import {
  Layers,
  Server,
  Database,
  Globe,
  Shield,
  Cpu,
  Bell,
  Box,
  Plus,
  Trash2,
  Download,
  Upload,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileCode,
  Info,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Save,
  FolderOpen,
  ArrowRight
} from 'lucide-react';

export const ArchitectureBuilder = ({ onAwardXP }) => {
  // Service node palette items
  const palette = [
    { type: 'cloudfront', name: 'CloudFront', color: '#8b5cf6', category: 'Edge', icon: Globe },
    { type: 's3', name: 'Amazon S3', color: '#10b981', category: 'Storage', icon: Database },
    { type: 'alb', name: 'Application LB', color: '#06b6d4', category: 'Network', icon: Globe },
    { type: 'ec2', name: 'Amazon EC2', color: '#f59e0b', category: 'Compute', icon: Server },
    { type: 'lambda', name: 'AWS Lambda', color: '#f97316', category: 'Serverless', icon: Cpu },
    { type: 'rds', name: 'Amazon RDS', color: '#3b82f6', category: 'Database', icon: Database },
    { type: 'dynamodb', name: 'DynamoDB', color: '#6366f1', category: 'Database', icon: Layers },
    { type: 'cloudwatch', name: 'CloudWatch', color: '#ec4899', category: 'Management', icon: Bell },
    { type: 'vpc', name: 'VPC Subnet', color: '#14b8a6', category: 'Network', icon: Shield },
    { type: 'apigateway', name: 'API Gateway', color: '#d946ef', category: 'API', icon: Globe }
  ];

  // Predefined Architecture Templates
  const templates = {
    staticWeb: {
      id: 'staticWeb',
      title: 'Static Website Hosting with S3 & CloudFront',
      description: 'Ultra-low latency globally distributed static website with origin access control.',
      nodes: [
        { id: 'n1', type: 'cloudfront', name: 'CloudFront CDN', x: 120, y: 160 },
        { id: 'n2', type: 's3', name: 'S3 Static Bucket (Private)', x: 420, y: 160 }
      ],
      connections: [
        { from: 'n1', to: 'n2', label: 'OAC (Origin Access Control)', type: 'network' }
      ],
      analysis: {
        requestFlow: 'Client HTTPS request → Global Edge Location (CloudFront) → Cache Hit returns immediately; Cache Miss routes securely over AWS private backbone to S3 origin via OAC.',
        security: 'S3 Block Public Access is 100% enabled. Direct S3 bucket access is blocked; only CloudFront service principal can invoke GetObject with TLS 1.3 enforced.',
        ha: 'CloudFront provides 400+ globally distributed Points of Presence; Amazon S3 offers 99.999999999% (11 9s) durability across 3+ AZs.',
        bottlenecks: 'Cache invalidation propagation latency and cold-origin response times for uncached long-tail assets.',
        costDrivers: 'CloudFront egress data transfer ($0.085/GB) and HTTPS request volume (approx. $0.01 per 10,000 requests).',
        docsUrl: 'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html'
      }
    },
    threeTier: {
      id: 'threeTier',
      title: 'Resilient Three-Tier Web Application',
      description: 'Classic enterprise architecture separating Presentation, Business Logic, and Database layers.',
      nodes: [
        { id: 'n1', type: 'alb', name: 'Public Internet ALB', x: 80, y: 160 },
        { id: 'n2', type: 'ec2', name: 'EC2 Auto Scaling Fleet', x: 340, y: 160 },
        { id: 'n3', type: 'rds', name: 'RDS Multi-AZ MySQL', x: 600, y: 160 },
        { id: 'n4', type: 'cloudwatch', name: 'CloudWatch Alarms', x: 340, y: 320 }
      ],
      connections: [
        { from: 'n1', to: 'n2', label: 'HTTP Port 8080 (Private SG)', type: 'network' },
        { from: 'n2', to: 'n3', label: 'MySQL Port 3306 (KMS Encrypted)', type: 'network' },
        { from: 'n2', to: 'n4', label: 'CPU & RAM Telemetry', type: 'logical' }
      ],
      analysis: {
        requestFlow: 'User → Route 53 DNS → Public ALB (Public Subnets) → Target Group across EC2 instances (Private Subnets) → Queries synchronous RDS Multi-AZ Standby.',
        security: 'Strict Security Group chaining: EC2 only accepts traffic from ALB SG; RDS only accepts port 3306 from EC2 SG. Database has NO public IP.',
        ha: 'ALB spans 2+ Availability Zones. EC2 Auto Scaling balances across AZs. RDS automatically fails over to standby replica in secondary AZ in < 60s.',
        bottlenecks: 'Database write contention and connection pool exhaustion on heavy relational transactional spikes.',
        costDrivers: 'EC2 compute instance hours (t3/m5), multi-AZ RDS instance licensing, and NAT Gateway data processing fees.',
        docsUrl: 'https://aws.amazon.com/solutions/implementations/three-tier-architecture/'
      }
    },
    serverless: {
      id: 'serverless',
      title: 'Serverless REST API (API Gateway + Lambda + DynamoDB)',
      description: 'Fully managed, auto-scaling serverless backend with zero idle server costs.',
      nodes: [
        { id: 'n1', type: 'apigateway', name: 'HTTP API Gateway', x: 100, y: 180 },
        { id: 'n2', type: 'lambda', name: 'Order Processing Lambda', x: 360, y: 180 },
        { id: 'n3', type: 'dynamodb', name: 'Orders DynamoDB Table', x: 620, y: 180 }
      ],
      connections: [
        { from: 'n1', to: 'n2', label: 'Lambda Proxy Integration', type: 'network' },
        { from: 'n2', to: 'n3', label: 'IAM Assumed Execution Role', type: 'logical' }
      ],
      analysis: {
        requestFlow: 'REST Client → API Gateway (JWT / Cognito Auth validation) → Synchronously invokes AWS Lambda function → Read/Write single-digit millisecond query to DynamoDB table.',
        security: 'IAM Execution Role gives Lambda least-privilege `dynamodb:PutItem` rights. API Gateway rate-limiting thwarts DDoS spikes.',
        ha: 'Built-in multi-AZ redundancy by default without configuring virtual machines or subnets.',
        bottlenecks: 'Lambda cold starts (mitigated with Provisioned Concurrency) and DynamoDB partition key throttling if poorly chosen.',
        costDrivers: 'Request volume: API Gateway ($1.00/million), Lambda duration per GB-second, and DynamoDB Write Capacity Units (WCU).',
        docsUrl: 'https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html'
      }
    }
  };

  // Canvas State
  const [nodes, setNodes] = useState(templates.staticWeb.nodes);
  const [connections, setConnections] = useState(templates.staticWeb.connections);
  const [selectedTemplateKey, setSelectedTemplateKey] = useState('staticWeb');
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [connectingFromId, setConnectingFromId] = useState(null);
  const [activeAnalysis, setActiveAnalysis] = useState(templates.staticWeb.analysis);

  // Undo / Redo history
  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  // Zoom & Pan
  const [zoom, setZoom] = useState(1);
  const canvasRef = useRef(null);

  // Dragging state
  const [draggingNodeId, setDraggingNodeId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Status message
  const [statusMessage, setStatusMessage] = useState(null);

  const showNotification = (msg) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  // Push history state
  const pushState = (newNodes, newConnections) => {
    const nextHistory = history.slice(0, historyIdx + 1);
    nextHistory.push({ nodes: JSON.parse(JSON.stringify(newNodes)), connections: JSON.parse(JSON.stringify(newConnections)) });
    setHistory(nextHistory);
    setHistoryIdx(nextHistory.length - 1);
  };

  // Load a predefined template
  const loadTemplate = (key) => {
    const tmpl = templates[key];
    if (!tmpl) return;
    setNodes(tmpl.nodes);
    setConnections(tmpl.connections);
    setSelectedTemplateKey(key);
    setActiveAnalysis(tmpl.analysis);
    setSelectedNodeId(null);
    setConnectingFromId(null);
    pushState(tmpl.nodes, tmpl.connections);
    showNotification(`Loaded template: ${tmpl.title}`);
  };

  // Add a new node to canvas from palette
  const addNode = (paletteItem) => {
    const id = 'node_' + Date.now();
    const newNode = {
      id,
      type: paletteItem.type,
      name: paletteItem.name,
      x: 150 + Math.random() * 200,
      y: 100 + Math.random() * 150
    };
    const updated = [...nodes, newNode];
    setNodes(updated);
    pushState(updated, connections);
    setSelectedNodeId(id);
    showNotification(`Added ${paletteItem.name} to diagram`);
  };

  // Delete selected node
  const deleteSelectedNode = () => {
    if (!selectedNodeId) return;
    const updatedNodes = nodes.filter(n => n.id !== selectedNodeId);
    const updatedConn = connections.filter(c => c.from !== selectedNodeId && c.to !== selectedNodeId);
    setNodes(updatedNodes);
    setConnections(updatedConn);
    setSelectedNodeId(null);
    pushState(updatedNodes, updatedConn);
    showNotification('Node deleted');
  };

  // Connection handling
  const handleNodeClick = (nodeId, e) => {
    e.stopPropagation();
    if (connectingFromId) {
      if (connectingFromId !== nodeId) {
        // Create connection
        const exists = connections.some(c => c.from === connectingFromId && c.to === nodeId);
        if (!exists) {
          const newConn = [...connections, { from: connectingFromId, to: nodeId, label: 'TCP / HTTPS Flow', type: 'network' }];
          setConnections(newConn);
          pushState(nodes, newConn);
          showNotification('Connected services');
        }
      }
      setConnectingFromId(null);
    } else {
      setSelectedNodeId(nodeId);
    }
  };

  // Undo / Redo
  const handleUndo = () => {
    if (historyIdx > 0) {
      const prev = history[historyIdx - 1];
      setNodes(prev.nodes);
      setConnections(prev.connections);
      setHistoryIdx(historyIdx - 1);
    }
  };

  const handleRedo = () => {
    if (historyIdx < history.length - 1) {
      const next = history[historyIdx + 1];
      setNodes(next.nodes);
      setConnections(next.connections);
      setHistoryIdx(historyIdx + 1);
    }
  };

  const handleClear = () => {
    if (window.confirm('Clear all components from the diagram?')) {
      setNodes([]);
      setConnections([]);
      pushState([], []);
      setSelectedNodeId(null);
      showNotification('Canvas cleared');
    }
  };

  // Diagram persistence
  const saveDiagram = () => {
    const data = { nodes, connections, savedAt: new Date().toISOString() };
    try {
      localStorage.setItem('aws_saved_architecture', JSON.stringify(data));
      showNotification('Diagram saved successfully to local storage!');
      if (onAwardXP) onAwardXP(25);
    } catch (e) {
      console.error(e);
    }
  };

  const loadSavedDiagram = () => {
    try {
      const saved = localStorage.getItem('aws_saved_architecture');
      if (saved) {
        const parsed = JSON.parse(saved);
        setNodes(parsed.nodes || []);
        setConnections(parsed.connections || []);
        pushState(parsed.nodes, parsed.connections);
        showNotification('Loaded saved architecture diagram!');
      } else {
        alert('No saved diagram found in local storage.');
      }
    } catch (e) {
      alert('Error loading diagram.');
    }
  };

  // Export diagram as JSON file
  const exportJSON = () => {
    const data = JSON.stringify({ nodes, connections, exportedAt: new Date().toISOString() }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aws-architecture-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Diagram JSON exported');
  };

  // Dragging event handlers
  const handleMouseDown = (nodeId, e) => {
    e.stopPropagation();
    setDraggingNodeId(nodeId);
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      setDragOffset({
        x: e.clientX / zoom - node.x,
        y: e.clientY / zoom - node.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (draggingNodeId) {
      const newX = Math.max(20, Math.min(800, e.clientX / zoom - dragOffset.x));
      const newY = Math.max(20, Math.min(480, e.clientY / zoom - dragOffset.y));
      setNodes(prev => prev.map(n => n.id === draggingNodeId ? { ...n, x: newX, y: newY } : n));
    }
  };

  const handleMouseUp = () => {
    if (draggingNodeId) {
      setDraggingNodeId(null);
      pushState(nodes, connections);
    }
  };

  // Find node helper
  const getNode = (id) => nodes.find(n => n.id === id);

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      
      {/* Top Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive AWS Architecture Designer</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Visual Cloud Topology & Solution Architect Canvas
          </h1>
          <p className="text-xs text-gray-400 mt-1 max-w-2xl">
            Design, connect, validate, and analyze cloud topologies. Inspect security boundaries, request flows, and cost drivers.
          </p>
        </div>

        {/* Template Quick Loader */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 font-medium">Templates:</span>
          <select
            value={selectedTemplateKey}
            onChange={(e) => loadTemplate(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-amber-500"
          >
            <option value="staticWeb">Static Web (S3 + CloudFront)</option>
            <option value="threeTier">Three-Tier Web (ALB + EC2 + RDS)</option>
            <option value="serverless">Serverless REST API (API GW + Lambda + DynamoDB)</option>
          </select>
        </div>
      </div>

      {statusMessage && (
        <div className="bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 px-4 py-2.5 rounded-lg text-xs flex items-center gap-2 animate-fade-in shadow-md">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* MAIN CANVAS & TOOLBAR WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Component Palette */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>AWS Component Palette</span>
            </h3>
            <p className="text-[11px] text-gray-500">
              Click any service component to drop it onto your architecture canvas.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2">
              {palette.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.type}
                    onClick={() => addNode(item)}
                    className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/60 text-left transition-all flex items-center gap-2.5 group"
                  >
                    <div 
                      className="w-6 h-6 rounded flex items-center justify-center text-white shrink-0 shadow-sm"
                      style={{ backgroundColor: item.color }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-gray-200 truncate group-hover:text-amber-400 transition-colors">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-gray-500">{item.category}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Diagram Actions Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Diagram Persistence
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={saveDiagram}
                className="py-2 px-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-gray-200 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Save className="w-3.5 h-3.5 text-amber-400" />
                <span>Save</span>
              </button>
              <button
                onClick={loadSavedDiagram}
                className="py-2 px-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-gray-200 flex items-center justify-center gap-1.5 transition-colors"
              >
                <FolderOpen className="w-3.5 h-3.5 text-blue-400" />
                <span>Load</span>
              </button>
              <button
                onClick={exportJSON}
                className="py-2 px-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-gray-200 flex items-center justify-center gap-1.5 transition-colors col-span-2"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Export Diagram JSON</span>
              </button>
            </div>
          </div>
        </div>

        {/* Center Visual Canvas */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Controls Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-2">
              <button
                onClick={handleUndo}
                className="p-1.5 rounded hover:bg-slate-800 text-gray-400 hover:text-white"
                title="Undo"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={handleRedo}
                className="p-1.5 rounded hover:bg-slate-800 text-gray-400 hover:text-white"
                title="Redo"
              >
                <RotateCw className="w-4 h-4" />
              </button>
              <div className="h-4 w-px bg-slate-800 mx-1"></div>
              <button
                onClick={() => setZoom(z => Math.max(0.6, z - 0.1))}
                className="p-1.5 rounded hover:bg-slate-800 text-gray-400 hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-gray-400">{Math.round(zoom * 100)}%</span>
              <button
                onClick={() => setZoom(z => Math.min(1.5, z + 0.1))}
                className="p-1.5 rounded hover:bg-slate-800 text-gray-400 hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoom(1)}
                className="p-1.5 rounded hover:bg-slate-800 text-gray-400 hover:text-white"
                title="Reset Zoom"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              {selectedNodeId && (
                <>
                  <button
                    onClick={() => setConnectingFromId(selectedNodeId)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      connectingFromId === selectedNodeId
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-slate-800 text-gray-200 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {connectingFromId === selectedNodeId ? 'Click target node...' : 'Connect Service →'}
                  </button>
                  <button
                    onClick={deleteSelectedNode}
                    className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20"
                    title="Delete Node"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}

              <button
                onClick={handleClear}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-gray-300 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          {/* SVG Canvas Board */}
          <div 
            ref={canvasRef}
            onClick={() => { setSelectedNodeId(null); setConnectingFromId(null); }}
            className="w-full h-[460px] bg-slate-950 border border-slate-800 rounded-xl relative overflow-hidden shadow-inner cursor-crosshair select-none"
            style={{
              backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          >
            <svg 
              className="w-full h-full absolute inset-0 pointer-events-none"
              style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
            >
              {/* Render Connections */}
              {connections.map((conn, idx) => {
                const source = getNode(conn.from);
                const target = getNode(conn.to);
                if (!source || !target) return null;

                const sx = source.x + 80;
                const sy = source.y + 35;
                const tx = target.x + 80;
                const ty = target.y + 35;
                const mx = (sx + tx) / 2;
                const my = (sy + ty) / 2;

                return (
                  <g key={idx}>
                    <line
                      x1={sx}
                      y1={sy}
                      x2={tx}
                      y2={ty}
                      stroke="#FF9900"
                      strokeWidth="2.5"
                      strokeDasharray={conn.type === 'logical' ? '5,5' : 'none'}
                      opacity="0.85"
                    />
                    <circle cx={sx} cy={sy} r="4" fill="#FF9900" />
                    <circle cx={tx} cy={ty} r="4" fill="#38bdf8" />
                    {conn.label && (
                      <text
                        x={mx}
                        y={my - 8}
                        fill="#94a3b8"
                        fontSize="10"
                        fontFamily="monospace"
                        textAnchor="middle"
                        className="bg-slate-900"
                      >
                        {conn.label}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Render Draggable Nodes */}
            <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }} className="w-full h-full relative">
              {nodes.map((node) => {
                const isSelected = selectedNodeId === node.id;
                const isConnecting = connectingFromId === node.id;
                const paletteItem = palette.find(p => p.type === node.type) || palette[0];
                const Icon = paletteItem.icon;

                return (
                  <div
                    key={node.id}
                    onMouseDown={(e) => handleMouseDown(node.id, e)}
                    onClick={(e) => handleNodeClick(node.id, e)}
                    style={{ left: `${node.x}px`, top: `${node.y}px` }}
                    className={`absolute w-44 p-3 rounded-xl border cursor-move shadow-xl transition-shadow ${
                      isSelected
                        ? 'ring-2 ring-amber-400 border-amber-400 bg-slate-900 z-30'
                        : isConnecting
                        ? 'ring-2 ring-blue-400 border-blue-400 bg-slate-900 z-30'
                        : 'bg-slate-900/90 border-slate-700/80 hover:border-slate-500 z-10'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div 
                        className="w-6 h-6 rounded flex items-center justify-center text-white shrink-0 shadow-sm"
                        style={{ backgroundColor: paletteItem.color }}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11px] font-bold text-white truncate">{node.name}</span>
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono truncate">
                      type: {node.type}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Canvas Legend */}
            <div className="absolute bottom-3 left-3 bg-slate-900/90 border border-slate-800 rounded-lg p-2.5 text-[10px] text-gray-400 space-y-1 shadow-md pointer-events-none">
              <div className="font-bold text-gray-300 uppercase tracking-wider text-[9px]">Legend</div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-0.5 bg-amber-400 inline-block"></span>
                <span>Network Traffic Flow</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-0.5 border-b border-dashed border-amber-400 inline-block"></span>
                <span>Logical / IAM Dependency</span>
              </div>
            </div>
          </div>

          {/* Comprehensive Architectural Analysis Card */}
          {activeAnalysis && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Info className="w-4 h-4 text-amber-400" />
                  <span>Architecture Deep-Dive & Well-Architected Review</span>
                </h3>
                {activeAnalysis.docsUrl && (
                  <a
                    href={activeAnalysis.docsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
                  >
                    <span>AWS Official Architecture Docs</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <span className="font-bold text-blue-400 block">Request & Data Flow</span>
                  <p className="text-gray-300 leading-relaxed">{activeAnalysis.requestFlow}</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <span className="font-bold text-emerald-400 block">Security Boundaries</span>
                  <p className="text-gray-300 leading-relaxed">{activeAnalysis.security}</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <span className="font-bold text-purple-400 block">High Availability</span>
                  <p className="text-gray-300 leading-relaxed">{activeAnalysis.ha}</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <span className="font-bold text-rose-400 block">Potential Bottlenecks</span>
                  <p className="text-gray-300 leading-relaxed">{activeAnalysis.bottlenecks}</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1 lg:col-span-2">
                  <span className="font-bold text-amber-400 block">Cost Drivers & Trade-offs</span>
                  <p className="text-gray-300 leading-relaxed">{activeAnalysis.costDrivers}</p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
