class Registry {
  constructor() { this.classes = new Map(); this.events = []; this.started = Date.now(); }
  register(name, instance) { this.classes.set(name, { instance, functions: new Map() }); return instance; }
  function(owner, name, callback) { this.classes.get(owner).functions.set(name, { callback, calls: 0 }); }
  invoke(owner, name, ...args) {
    const entry = this.classes.get(owner)?.functions.get(name);
    if (!entry) return;
    entry.calls++;
    this.events.push({ owner, name, time: Date.now() });
    if (this.events.length > 300) this.events.shift();
    return entry.callback(...args);
  }
  stats() { return { classes: this.classes.size, functions: [...this.classes.values()].reduce((n, v) => n + v.functions.size, 0), events: this.events.length, uptime: Math.floor((Date.now() - this.started) / 1000) }; }
}
class Environment {
  constructor(registry) { this.registry = registry; registry.register('environment', this); registry.function('environment', 'detect', () => this.detect()); this.detect(); }
  detect() {
    const ua = navigator.userAgent, w = innerWidth;
    const mobile = w < 640 || /iPhone|Android.*Mobile/i.test(ua);
    const tablet = !mobile && (w < 1024 || /iPad|Tablet/i.test(ua));
    this.info = { mode: mobile ? 'mobile' : tablet ? 'tablet' : 'desktop', os: /Windows/i.test(ua) ? 'Windows' : /Android/i.test(ua) ? 'Android' : /iPhone|iPad/i.test(ua) ? 'iOS / iPadOS' : /Mac/i.test(ua) ? 'macOS' : /Linux/i.test(ua) ? 'Linux' : 'Other', browser: /Firefox/i.test(ua) ? 'Firefox' : /Edg\//i.test(ua) ? 'Edge' : /Chrome/i.test(ua) ? 'Chrome' : /Safari/i.test(ua) ? 'Safari' : 'Other', viewport: w + ' × ' + innerHeight, WebAssembly: typeof WebAssembly !== 'undefined', WebGPU: !!navigator.gpu, WebAudio: !!(window.AudioContext || window.webkitAudioContext), WebBluetooth: !!navigator.bluetooth, WebUSB: !!navigator.usb };
    return this.info;
  }
}
class Interface {
  constructor(registry, environment) {
    this.registry = registry; this.environment = environment; this.active = null; this.menu = false; this.recent = false; this.openApps = new Set();
    registry.register('interface', this);
    for (const name of ['render', 'open', 'close']) registry.function('interface', name, (...args) => this[name](...args));
    this.style(); this.render();
    addEventListener('resize', () => { registry.invoke('environment', 'detect'); this.render(); });
  }
  node(tag, props = {}, children = []) {
    const el = document.createElement(tag);
    for (const [k,v] of Object.entries(props)) {
      if (k === 'text') el.textContent = v;
      else if (k === 'class') el.className = v;
      else if (k === 'click') el.addEventListener('click', v);
      else el.setAttribute(k, v);
    }
    for (const child of children) el.append(child);
    return el;
  }
  style() {
    const css = `:root{font:15px system-ui,-apple-system,Segoe UI,sans-serif;color-scheme:dark}*{box-sizing:border-box}body{margin:0;background:#090e1b;color:#f1f5ff}button,input{font:inherit;color:inherit}button{cursor:pointer}#haamu{height:100dvh;display:flex;flex-direction:column;background:radial-gradient(ellipse at 25% 0%,#273957 0%,transparent 52%),radial-gradient(ellipse at 100% 100%,#143340 0%,transparent 50%),#090e1b}.top{display:flex;align-items:center;gap:16px;padding:14px 22px;border-bottom:1px solid #ffffff18;backdrop-filter:blur(20px)}.brand{border:0;background:transparent;font-size:14px;letter-spacing:.15em;font-weight:750;display:flex;align-items:center;gap:12px}.logo{width:35px;height:35px;border-radius:12px;display:grid;place-items:center;background:linear-gradient(135deg,#b1c9f7,#36538a);box-shadow:0 0 30px #668dff44}.spacer{flex:1}.muted{color:#afbdd3;font-size:12px}.mode{border:1px solid #ffffff20;border-radius:30px;padding:8px 12px;font-size:11px}.main{flex:1;overflow:auto;position:relative;padding:clamp(20px,5vw,55px)}.hero,.cards{max-width:960px;margin:0 auto}.eyebrow{color:#9eb8dc;letter-spacing:.22em;text-transform:uppercase;font-size:11px}.hero h1{font-size:clamp(40px,6vw,76px);font-weight:550;letter-spacing:-.06em;margin:16px 0}.hero p{max-width:630px;color:#b2bfd4;line-height:1.7}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:15px;margin-top:30px}.card{min-height:170px;text-align:left;padding:24px;border:1px solid #ffffff1c;border-radius:22px;background:#ffffff0b;backdrop-filter:blur(20px);display:flex;flex-direction:column;gap:14px}.card:hover,.menuitem:hover{background:#ffffff1a}.card strong{font-size:18px}.card span{color:#afbdd3;font-size:13px;line-height:1.5}.symbol{font-size:27px!important;color:#d4e2ff!important}.window{position:absolute;z-index:2;left:14%;top:9%;width:min(690px,80%);max-height:80%;overflow:auto;border-radius:20px;background:#1a2537f2;box-shadow:0 25px 90px #000a;backdrop-filter:blur(30px)}.windowhead{display:flex;align-items:center;padding:16px 22px;border-bottom:1px solid #ffffff18;gap:12px}.windowbody{padding:25px;color:#bdc9db;line-height:1.7}.windowbody h2{color:white}.windowbody p{margin:12px 0}.flat{background:transparent;border:0;padding:9px;border-radius:10px}.flat:hover{background:#ffffff15}.bottom{display:flex;align-items:center;gap:16px;padding:10px 20px;min-height:55px;background:#111b2cc9;backdrop-filter:blur(24px);border-top:1px solid #ffffff12}.menu{position:absolute;bottom:65px;left:16px;z-index:8;background:#1c2a3ded;border-radius:18px;padding:15px;width:min(320px,calc(100vw - 32px));box-shadow:0 20px 80px #0009}.search{width:100%;padding:13px;border:0;border-radius:12px;background:#ffffff12;outline:0}.menuitem{display:block;width:100%;text-align:left;padding:13px;border:0;border-radius:10px;background:transparent}.mobilebar{display:flex;justify-content:space-around;align-items:center;min-height:65px;background:#111b2ce6}.mobilebar button{border:0;background:transparent;font-size:26px;padding:9px 25px}.recent{position:absolute;inset:0;background:#0c1325f2;z-index:5;display:flex;gap:20px;align-items:center;overflow:auto;padding:20px}.recentcard{min-width:65%;max-width:310px;height:65%;border-radius:20px;padding:25px;background:#293b56;border:1px solid #ffffff22;touch-action:pan-y}.metric{display:inline-block;padding:14px;margin:5px;border-radius:12px;background:#ffffff12}.metric strong{display:block;color:white;font-size:26px}@media(max-width:850px){.cards{grid-template-columns:repeat(2,1fr)}.window{left:4%;width:92%}}@media(max-width:620px){.cards{grid-template-columns:1fr}.card{min-height:120px}.top .muted{display:none}.main{padding:22px 17px}.window{inset:0;width:100%;height:100%;max-height:100%;border-radius:0}}`;
    document.head.append(this.node('style',{text:css}));
  }
  open(name) { this.active = name; this.openApps.add(name); this.menu = false; this.recent = false; this.render(); }
  close() { this.active = null; this.render(); }
  content(name) {
    if (name === 'Systems') return [['Runtime','Registered class instances, function dispatch and event lifecycle.'],['Round trips','Every registry invocation is tracked for cross-function auditing.'],['Extensions','WebAssembly, WebGPU, WebAudio, WebBluetooth and WebUSB capability detection.']];
    if (name === 'Environment') return Object.entries(this.environment.info).map(([k,v])=>[k,String(v)]);
    const s=this.registry.stats();
    return [['Classes',s.classes],['Functions',s.functions],['Events',s.events],['Uptime (seconds)',s.uptime],['R engine',window.haamuAudit?.status || 'Initializing']];
  }
  window(name) {
    const box=this.node('section',{class:'window'}), head=this.node('div',{class:'windowhead'},[this.node('strong',{text:name}),this.node('div',{class:'spacer'})]);
    if(this.environment.info.mode==='desktop')head.append(this.node('button',{class:'flat',text:'✕',click:()=>this.close()}));
    box.append(head);
    const body=this.node('div',{class:'windowbody'},[this.node('h2',{text:name})]);
    for(const [key,value] of this.content(name))body.append(this.node('p',{},[this.node('strong',{text:key+': '}),this.node('span',{text:String(value)})]));
    box.append(body);return box;
  }
  render() {
    document.title='HAAMU CORPORATION';
    const mode=this.environment.info.mode, root=this.node('div',{id:'haamu'});
    root.append(this.node('header',{class:'top'},[this.node('button',{class:'brand',click:()=>{this.menu=!this.menu;this.render()}},[this.node('span',{class:'logo',text:'H'}),this.node('span',{text:'HAAMU CORPORATION'})]),this.node('div',{class:'spacer'}),this.node('span',{class:'muted',text:this.environment.info.os+' · '+this.environment.info.browser}),this.node('span',{class:'mode',text:mode.toUpperCase()})]));
    const main=this.node('main',{class:'main'}),hero=this.node('section',{class:'hero'},[this.node('div',{class:'eyebrow',text:'A foundation for evolving systems'}),this.node('h1',{text:'Ideas into systems.'}),this.node('p',{text:'A modular digital environment built around registered functions, continuous interactions, adaptive interfaces and observable runtime behaviour.'})]);
    main.append(hero);
    const cards=this.node('section',{class:'cards'});
    for(const [name,symbol,description] of [['Systems','◇','Explore the runtime architecture and its functions.'],['Environment','◈','Inspect device, browser and supported capabilities.'],['Audit','◎','Review runtime statistics and R engine status.']])cards.append(this.node('button',{class:'card',click:()=>this.registry.invoke('interface','open',name)},[this.node('span',{class:'symbol',text:symbol}),this.node('strong',{text:name}),this.node('span',{text:description})]));
    main.append(cards);if(this.active)main.append(this.window(this.active));root.append(main);
    if(this.menu){const menu=this.node('div',{class:'menu'}),search=this.node('input',{class:'search',placeholder:'Search as you type…'});menu.append(search);const items=this.node('div');menu.append(items);const fill=()=>{items.replaceChildren();for(const name of ['Overview','Systems','Environment','Audit'])if(name.toLowerCase().includes(search.value.toLowerCase()))items.append(this.node('button',{class:'menuitem',text:name,click:()=>name==='Overview'?this.close():(this.open(name))}));};search.addEventListener('input',fill);fill();root.append(menu);}
    if(mode==='desktop')root.append(this.node('footer',{class:'bottom'},[this.node('button',{class:'flat',text:'☰ Menu',click:()=>{this.menu=!this.menu;this.render()}}),this.node('span',{class:'muted',text:'HAAMU / SYSTEMS'}),this.node('div',{class:'spacer'}),this.node('span',{class:'muted',text:'Runtime active'})]));
    else {root.append(this.node('footer',{class:'mobilebar'},[this.node('button',{text:'‹',click:()=>this.close()}),this.node('button',{text:'●',click:()=>this.close()}),this.node('button',{text:'▢',click:()=>{this.recent=!this.recent;this.render()}})]));if(this.recent){const recent=this.node('div',{class:'recent'});for(const name of this.openApps){const card=this.node('div',{class:'recentcard'},[this.node('h2',{text:name}),this.node('button',{class:'flat',text:'Open',click:()=>this.open(name)})]);let y=0;card.addEventListener('touchstart',e=>{y=e.touches[0].clientY},{passive:true});card.addEventListener('touchend',e=>{if(Math.abs(e.changedTouches[0].clientY-y)>75){this.openApps.delete(name);card.remove();}});recent.append(card)}root.append(recent);}}
    document.body.replaceChildren(root);
  }
}
class Audit {
  constructor(registry){this.registry=registry;this.status='Initializing';registry.register('audit',this);registry.function('audit','sample',()=>this.sample());this.init();}
  async init(){try{const {WebR}=await import('https://webr.r-wasm.org/latest/webr.mjs');this.engine=new WebR();await this.engine.init();this.status='webR ready';await this.sample();}catch(error){this.status='webR unavailable; JavaScript counters active';}this.refresh();}
  async sample(){if(!this.engine)return;try{const response=await fetch('./index.R');if(!response.ok)throw Error('R source unavailable');const source=await response.text();await this.engine.evalRVoid(source);const stats=this.registry.stats();await this.engine.evalR('haamu_audit(events=c('+stats.events+'), classes='+stats.classes+'L, functions='+stats.functions+'L)');this.status='webR audit successful';}catch(error){this.status='webR ready; audit sample unavailable';}this.refresh();}
  refresh(){if(window.haamuApp?.interface.active==='Audit')window.haamuApp.interface.render();}
}
class HaamuApplication {
  constructor(){this.registry=new Registry();this.registry.register('application',this);this.environment=new Environment(this.registry);this.interface=new Interface(this.registry,this.environment);this.audit=new Audit(this.registry);}
}
const boot=()=>{window.haamuApp=new HaamuApplication();window.haamuAudit=window.haamuApp.audit;};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
