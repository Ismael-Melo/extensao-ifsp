// PROJETO EXTENSÃO IFSP 2026 — DASHBOARD v4 FINAL
// Configure o Supabase antes de usar:

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import {
  LayoutDashboard, ListChecks, LogOut, Search, Download, Bell, Calendar,
  CheckCircle2, Clock, AlertTriangle, Eye, FileSpreadsheet, FileText,
  MessageSquare, History, ChevronDown, ChevronRight, X, Check, Key,
  Lock, User, Send, Activity, Shield, UserCheck, Users, CalendarDays,
  TrendingUp, EyeOff, RefreshCw, AlertCircle, UserPlus, ArrowRightLeft,
  Award, BarChart3, Plus, Trash2, Edit3, Ban, Settings, UserX,
  XCircle, RotateCcw, Copy, UserPlus2
} from "lucide-react";

// Configure o Supabase:
const SUPABASE_URL      = "https://efptmcutbikkdcjvxooh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmcHRtY3V0Ymlra2RjanZ4b29oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MTY1MjAsImV4cCI6MjA5NDE5MjUyMH0.s1cbOSi5OIDeSAJYFFa90FtZZ_0UBjp79eneCZKPAAA";


// DADOS INICIAIS
const INITIAL_USERS = {
  "Ismael de Melo":     { role:"gestor",    grupo:"Gestão",  pwd:"GestaoProject2026", ativo:true },
  "Kauan Pereira":      { role:"gestor",    grupo:"Gestão",  pwd:"GestaoProject2026", ativo:true },
  "Estevan Guandelini": { role:"integrante", grupo:"Eventos", pwd:"EstevanAuto754",    ativo:true },
  "Gabriel Diogo":      { role:"integrante", grupo:"Eventos", pwd:"Proj125Gabriel",    ativo:true },
  "Gabriel Morgado":    { role:"integrante", grupo:"Eventos", pwd:"Ifsp381Gabriel",    ativo:true },
  "Thomaz":             { role:"integrante", grupo:"Doc. B",  pwd:"ThomazIfsp328",     ativo:true },
  "Edval":              { role:"integrante", grupo:"Doc. B",  pwd:"EdvalAuto854",      ativo:true },
  "Eduardo Cortez":     { role:"integrante", grupo:"Doc. B",  pwd:"EduardoProj792",    ativo:true },
  "Eduardo Silva":      { role:"integrante", grupo:"Doc. B",  pwd:"EduardoAuto658",    ativo:true },
  "Thauana":            { role:"integrante", grupo:"Doc. B",  pwd:"ThauanaIndu704",    ativo:true },
  "Lucas Alexandre":    { role:"integrante", grupo:"Doc. A",  pwd:"LucasAuto132",      ativo:true },
  "Téo Nunes":          { role:"integrante", grupo:"Doc. A",  pwd:"Ifsp195Teo",        ativo:true },
  "Luis Rafael":        { role:"integrante", grupo:"Doc. A",  pwd:"LuisExt338",        ativo:true },
  "Vitor Santos":       { role:"integrante", grupo:"Doc. A",  pwd:"VitorAuto716",      ativo:true },
};

const INITIAL_DOCS = [
  {id:"1.1",cat:"1. Abertura",doc:"Plano do projeto completo",dif:"Difícil",grupo:"Gestão"},
  {id:"1.2",cat:"1. Abertura",doc:"Cronograma detalhado",dif:"Médio",grupo:"Gestão"},
  {id:"1.3",cat:"1. Abertura",doc:"Plano de comunicação",dif:"Médio",grupo:"Gestão"},
  {id:"1.4",cat:"1. Abertura",doc:"Aprovação da coordenação",dif:"Fácil",grupo:"Gestão"},
  {id:"1.5",cat:"1. Abertura",doc:"Ata inicial",dif:"Fácil",grupo:"Gestão"},
  {id:"2.1",cat:"2. Controle Acadêmico",doc:"Lista de presença – visitantes",dif:"Fácil",grupo:"Eventos"},
  {id:"2.2",cat:"2. Controle Acadêmico",doc:"Lista de presença – equipe",dif:"Fácil",grupo:"Doc. A"},
  {id:"2.3",cat:"2. Controle Acadêmico",doc:"Lista de presença – palestras",dif:"Fácil",grupo:"Eventos"},
  {id:"2.4",cat:"2. Controle Acadêmico",doc:"Relatório mensal",dif:"Médio",grupo:"Gestão"},
  {id:"2.5",cat:"2. Controle Acadêmico",doc:"Diário de atividades",dif:"Fácil",grupo:"Doc. A"},
  {id:"2.6",cat:"2. Controle Acadêmico",doc:"Registro fotográfico",dif:"Fácil",grupo:"Eventos"},
  {id:"2.7",cat:"2. Controle Acadêmico",doc:"Checklist de execução",dif:"Fácil",grupo:"Gestão"},
  {id:"3.1",cat:"3. Visitas Técnicas",doc:"Solicitação oficial",dif:"Médio",grupo:"Doc. B"},
  {id:"3.2",cat:"3. Visitas Técnicas",doc:"Ofício empresa",dif:"Médio",grupo:"Doc. B"},
  {id:"3.3",cat:"3. Visitas Técnicas",doc:"Carta de apresentação",dif:"Médio",grupo:"Doc. A"},
  {id:"3.4",cat:"3. Visitas Técnicas",doc:"Termo de parceria",dif:"Difícil",grupo:"Doc. A"},
  {id:"3.5",cat:"3. Visitas Técnicas",doc:"Autorização empresa",dif:"Médio",grupo:"Doc. B"},
  {id:"3.6",cat:"3. Visitas Técnicas",doc:"Plano da visita",dif:"Médio",grupo:"Doc. A"},
  {id:"3.7",cat:"3. Visitas Técnicas",doc:"Cronograma da visita",dif:"Fácil",grupo:"Doc. B"},
  {id:"3.8",cat:"3. Visitas Técnicas",doc:"Lista de participantes",dif:"Fácil",grupo:"Doc. A"},
  {id:"3.9",cat:"3. Visitas Técnicas",doc:"Autorização dos responsáveis",dif:"Fácil",grupo:"Doc. B"},
  {id:"3.10",cat:"3. Visitas Técnicas",doc:"Termo de responsabilidade alunos",dif:"Médio",grupo:"Doc. B"},
  {id:"3.11",cat:"3. Visitas Técnicas",doc:"Regras de segurança",dif:"Fácil",grupo:"Doc. A"},
  {id:"3.12",cat:"3. Visitas Técnicas",doc:"Checklist de EPIs",dif:"Fácil",grupo:"Doc. B"},
  {id:"3.13",cat:"3. Visitas Técnicas",doc:"Autorização de imagem",dif:"Médio",grupo:"Doc. A"},
  {id:"3.14",cat:"3. Visitas Técnicas",doc:"Lista de presença da visita",dif:"Fácil",grupo:"Eventos"},
  {id:"3.15",cat:"3. Visitas Técnicas",doc:"Relatório da visita",dif:"Difícil",grupo:"Doc. B"},
  {id:"3.16",cat:"3. Visitas Técnicas",doc:"Avaliação da visita",dif:"Médio",grupo:"Doc. B"},
  {id:"3.17",cat:"3. Visitas Técnicas",doc:"Feedback da empresa",dif:"Fácil",grupo:"Doc. A"},
  {id:"3.18",cat:"3. Visitas Técnicas",doc:"Certificados",dif:"Médio",grupo:"Doc. A"},
  {id:"4.1",cat:"4. Eventos Internos",doc:"Plano do evento",dif:"Difícil",grupo:"Eventos"},
  {id:"4.2",cat:"4. Eventos Internos",doc:"Programação oficial",dif:"Médio",grupo:"Eventos"},
  {id:"4.3",cat:"4. Eventos Internos",doc:"Roteiro do evento",dif:"Médio",grupo:"Eventos"},
  {id:"4.4",cat:"4. Eventos Internos",doc:"Cronograma detalhado",dif:"Médio",grupo:"Eventos"},
  {id:"4.5",cat:"4. Eventos Internos",doc:"Escala da equipe",dif:"Fácil",grupo:"Eventos"},
  {id:"4.6",cat:"4. Eventos Internos",doc:"Controle de salas",dif:"Fácil",grupo:"Eventos"},
  {id:"4.7",cat:"4. Eventos Internos",doc:"Controle de equipamentos",dif:"Fácil",grupo:"Eventos"},
  {id:"4.8",cat:"4. Eventos Internos",doc:"Checklist pré-evento",dif:"Fácil",grupo:"Eventos"},
  {id:"4.9",cat:"4. Eventos Internos",doc:"Checklist pós-evento",dif:"Fácil",grupo:"Eventos"},
  {id:"4.10",cat:"4. Eventos Internos",doc:"Lista de presença",dif:"Fácil",grupo:"Eventos"},
  {id:"4.11",cat:"4. Eventos Internos",doc:"Crachás",dif:"Fácil",grupo:"Eventos"},
  {id:"4.12",cat:"4. Eventos Internos",doc:"LGPD participantes",dif:"Médio",grupo:"Doc. B"},
  {id:"4.13",cat:"4. Eventos Internos",doc:"Uso de imagem",dif:"Médio",grupo:"Doc. A"},
  {id:"4.14",cat:"4. Eventos Internos",doc:"Pesquisa de satisfação",dif:"Médio",grupo:"Doc. B"},
  {id:"5.1",cat:"5. Apresentações e Modelos",doc:"Template PowerPoint",dif:"Difícil",grupo:"Doc. A"},
  {id:"5.2",cat:"5. Apresentações e Modelos",doc:"Modelo de relatório Word",dif:"Difícil",grupo:"Doc. B"},
  {id:"5.3",cat:"5. Apresentações e Modelos",doc:"Modelo de ata",dif:"Fácil",grupo:"Doc. B"},
  {id:"5.4",cat:"5. Apresentações e Modelos",doc:"Modelo de ofício",dif:"Médio",grupo:"Doc. A"},
  {id:"5.5",cat:"5. Apresentações e Modelos",doc:"Modelo de memorando",dif:"Médio",grupo:"Doc. B"},
  {id:"5.6",cat:"5. Apresentações e Modelos",doc:"Modelo de e-mail",dif:"Fácil",grupo:"Doc. A"},
  {id:"5.7",cat:"5. Apresentações e Modelos",doc:"Modelo de convite",dif:"Fácil",grupo:"Doc. B"},
  {id:"5.8",cat:"5. Apresentações e Modelos",doc:"Modelo de declaração",dif:"Fácil",grupo:"Doc. A"},
  {id:"5.9",cat:"5. Apresentações e Modelos",doc:"Modelo de certificado",dif:"Médio",grupo:"Doc. A"},
  {id:"6.1",cat:"6. Jurídicos",doc:"Termo LGPD",dif:"Difícil",grupo:"Doc. A"},
  {id:"6.2",cat:"6. Jurídicos",doc:"Uso de imagem",dif:"Médio",grupo:"Doc. B"},
  {id:"6.3",cat:"6. Jurídicos",doc:"Termo de responsabilidade",dif:"Médio",grupo:"Doc. A"},
  {id:"6.5",cat:"6. Jurídicos",doc:"Declaração de participação",dif:"Fácil",grupo:"Doc. B"},
  {id:"6.6",cat:"6. Jurídicos",doc:"Declaração de horas",dif:"Fácil",grupo:"Doc. A"},
  {id:"6.7",cat:"6. Jurídicos",doc:"Termo de parceria",dif:"Difícil",grupo:"Doc. B"},
  {id:"6.8",cat:"6. Jurídicos",doc:"Ofícios",dif:"Médio",grupo:"Doc. B"},
  {id:"6.9",cat:"6. Jurídicos",doc:"Atas de decisões",dif:"Fácil",grupo:"Gestão"},
  {id:"7.1",cat:"7. Comunicação",doc:"Folder",dif:"Difícil",grupo:"Doc. A"},
  {id:"7.2",cat:"7. Comunicação",doc:"Banner",dif:"Difícil",grupo:"Doc. B"},
  {id:"7.3",cat:"7. Comunicação",doc:"Arte Instagram",dif:"Médio",grupo:"Doc. A"},
  {id:"7.4",cat:"7. Comunicação",doc:"Arte WhatsApp",dif:"Fácil",grupo:"Doc. B"},
  {id:"7.5",cat:"7. Comunicação",doc:"E-mail marketing",dif:"Médio",grupo:"Doc. B"},
  {id:"7.6",cat:"7. Comunicação",doc:"Convite oficial",dif:"Médio",grupo:"Eventos"},
  {id:"7.7",cat:"7. Comunicação",doc:"Texto de divulgação",dif:"Fácil",grupo:"Doc. A"},
  {id:"7.8",cat:"7. Comunicação",doc:"Comunicado interno",dif:"Fácil",grupo:"Gestão"},
  {id:"7.9",cat:"7. Comunicação",doc:"Lista de contatos",dif:"Fácil",grupo:"Gestão"},
  {id:"8.1",cat:"8. Encerramento",doc:"Relatório final",dif:"Difícil",grupo:"Doc. A"},
  {id:"8.2",cat:"8. Encerramento",doc:"Indicadores de desempenho",dif:"Difícil",grupo:"Doc. B"},
  {id:"8.3",cat:"8. Encerramento",doc:"Número de participantes",dif:"Fácil",grupo:"Gestão"},
  {id:"8.4",cat:"8. Encerramento",doc:"Resultados obtidos",dif:"Médio",grupo:"Doc. A"},
  {id:"8.5",cat:"8. Encerramento",doc:"Pontos positivos",dif:"Fácil",grupo:"Doc. B"},
  {id:"8.6",cat:"8. Encerramento",doc:"Problemas encontrados",dif:"Fácil",grupo:"Doc. A"},
  {id:"8.7",cat:"8. Encerramento",doc:"Melhorias sugeridas",dif:"Médio",grupo:"Doc. B"},
  {id:"8.8",cat:"8. Encerramento",doc:"Prestação de contas",dif:"Difícil",grupo:"Doc. A"},
  {id:"8.9",cat:"8. Encerramento",doc:"Ata de encerramento",dif:"Fácil",grupo:"Gestão"},
  {id:"9.1",cat:"9. Profissionalização",doc:"Fluxograma de processo",dif:"Difícil",grupo:"Doc. A"},
  {id:"9.2",cat:"9. Profissionalização",doc:"Mapa de stakeholders",dif:"Médio",grupo:"Doc. A"},
  {id:"9.3",cat:"9. Profissionalização",doc:"Plano de riscos detalhado",dif:"Difícil",grupo:"Doc. B"},
  {id:"9.4",cat:"9. Profissionalização",doc:"Plano de emergência",dif:"Difícil",grupo:"Doc. B"},
  {id:"9.5",cat:"9. Profissionalização",doc:"Controle de não conformidades",dif:"Médio",grupo:"Doc. B"},
  {id:"9.6",cat:"9. Profissionalização",doc:"Manual do organizador",dif:"Difícil",grupo:"Doc. A"},
];

// CONSTANTES
const STATUS_LIST = ["Pendente","Em andamento","Em revisão","Concluído","Cancelado"];
const SC = {
  "Pendente":    {bg:"#1F2937",bd:"#F59E0B",tx:"#FBBF24",ic:Clock},
  "Em andamento":{bg:"#1E3A5F",bd:"#3B82F6",tx:"#60A5FA",ic:Activity},
  "Em revisão":  {bg:"#3B2E5C",bd:"#A78BFA",tx:"#C4B5FD",ic:Eye},
  "Concluído":   {bg:"#14422E",bd:"#10B981",tx:"#34D399",ic:CheckCircle2},
  "Cancelado":   {bg:"#1F1F1F",bd:"#6B7280",tx:"#9CA3AF",ic:XCircle},
};
const GC = {
  "Gestão": {bg:"#3B2E5C",tx:"#C4B5FD",ch:"#A78BFA"},
  "Eventos":{bg:"#3D2E14",tx:"#FBBF24",ch:"#F59E0B"},
  "Doc. A": {bg:"#14422E",tx:"#34D399",ch:"#10B981"},
  "Doc. B": {bg:"#1E3A5F",tx:"#60A5FA",ch:"#3B82F6"},
};
const DC = {
  "Fácil":  {bg:"#14422E",tx:"#34D399"},
  "Médio":  {bg:"#3D2E14",tx:"#FBBF24"},
  "Difícil":{bg:"#4C1D24",tx:"#F87171"},
};
const GRUPOS = ["Gestão","Eventos","Doc. A","Doc. B"];

// HELPERS
const fmtT = ts => new Date(ts).toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'});
const fmtD = ts => ts ? new Date(ts).toLocaleDateString('pt-BR') : "—";
const fmtDT = ts => ts ? new Date(ts).toLocaleString('pt-BR') : "—";
const validEmail = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const isAtrasado = d => d.status==="Concluído"||d.status==="Cancelado" ? false : d.prazo ? Date.now()>d.prazo : false;
const noPrazo = d => d.status!=="Concluído"||!d.primeiroPrazo||!d.dataConclusao ? null : d.dataConclusao<=d.primeiroPrazo;

const gerarSenha = nome => {
  const ws=["Auto","Ifsp","Pira","Indu","Ext","Proj"];
  const w=ws[Math.floor(Math.random()*ws.length)];
  const n=Math.floor(Math.random()*900)+100;
  const p=(nome.split(" ")[0]||"User").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zA-Z]/g,"");
  return n%2===0?`${p}${w}${n}`:`${w}${n}${p}`;
};

const blankDoc = () => ({status:"Pendente",prazo:null,primeiroPrazo:null,dataConclusao:null,dataRevisao:null,responsavel:null});

const SUPABASE_OK = SUPABASE_URL&&!SUPABASE_URL.includes("COLE")&&SUPABASE_ANON_KEY&&!SUPABASE_ANON_KEY.includes("COLE");
const H = {apikey:SUPABASE_ANON_KEY,Authorization:`Bearer ${SUPABASE_ANON_KEY}`};

const sbGet = async()=>{
  if(!SUPABASE_OK)return null;
  try{const r=await fetch(`${SUPABASE_URL}/rest/v1/projeto_extensao?id=eq.main&select=data`,{headers:H});const a=await r.json();return a[0]?.data||null;}
  catch{return null;}
};
const sbSet = async data=>{
  if(!SUPABASE_OK)return false;
  try{const r=await fetch(`${SUPABASE_URL}/rest/v1/projeto_extensao?on_conflict=id`,{method:'POST',headers:{...H,'Content-Type':'application/json',Prefer:'resolution=merge-duplicates'},body:JSON.stringify({id:'main',data,updated_at:new Date().toISOString()})});return r.ok;}
  catch{return false;}
};
const lcGet = k=>{try{return JSON.parse(localStorage.getItem("ifsp_"+k)||"null");}catch{return null;}};
const lcSet = (k,v)=>{try{localStorage.setItem("ifsp_"+k,JSON.stringify(v));}catch{}};

// LOGIN
function Login({onLogin,users}){
  const[mode,setMode]=useState("i");
  const[name,setName]=useState("");const[pass,setPass]=useState("");
  const[vN,setVN]=useState("");const[vE,setVE]=useState("");
  const[err,setErr]=useState("");
  const doI=()=>{
    if(!name)return setErr("Selecione seu nome");
    const u=users[name];
    if(!u)return setErr("Usuário não encontrado");
    if(!u.ativo)return setErr("Usuário inativo. Contate a gestão.");
    if(pass!==u.pwd)return setErr("Senha incorreta");
    onLogin({name,role:u.role,grupo:u.grupo});
  };
  const doV=()=>{
    if(!vN.trim())return setErr("Informe seu nome");
    if(!validEmail(vE))return setErr("E-mail inválido");
    onLogin({name:vN.trim(),role:"visitante",grupo:"Visitante",email:vE.trim()});
  };
  return(
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-7">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center"><Shield className="w-5 h-5 text-white"/></div>
          <div><div className="text-[10px] text-slate-400 uppercase tracking-widest">IFSP Piracicaba</div><div className="text-base font-bold text-white">Projeto Extensão 2026</div></div>
        </div>
        <p className="text-slate-400 text-xs mb-5">Painel de Gestão de Documentação</p>
        {!SUPABASE_OK&&<div className="mb-4 bg-amber-950/30 border border-amber-800/50 rounded-lg p-3 text-[11px] text-amber-300 flex items-start gap-2"><AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5"/><div><strong>Modo offline:</strong> Configure o Supabase para sincronização real.</div></div>}
        <div className="grid grid-cols-2 gap-1.5 mb-5 bg-slate-800/50 p-1 rounded-lg">
          <button onClick={()=>{setMode("i");setErr("");}} className={`flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-semibold ${mode==="i"?"bg-emerald-600 text-white":"text-slate-400"}`}><User className="w-3.5 h-3.5"/>Integrante</button>
          <button onClick={()=>{setMode("v");setErr("");}} className={`flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-semibold ${mode==="v"?"bg-emerald-600 text-white":"text-slate-400"}`}><UserCheck className="w-3.5 h-3.5"/>Visitante</button>
        </div>
        {mode==="i"?(
          <div className="space-y-3">
            <div><label className="block text-[10px] text-slate-400 mb-1.5 uppercase tracking-wider font-semibold">Nome</label>
              <select value={name} onChange={e=>{setName(e.target.value);setErr("");}} className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500">
                <option value="">— Escolha —</option>
                {Object.entries(users).filter(([_,u])=>u.ativo).map(([n,u])=><option key={n} value={n}>{n}{u.role==="gestor"?" — Gestão":""}</option>)}
              </select></div>
            <div><label className="block text-[10px] text-slate-400 mb-1.5 uppercase tracking-wider font-semibold">Senha individual</label>
              <div className="relative"><Lock className="w-4 h-4 absolute left-3 top-3 text-slate-500"/>
                <input type="password" value={pass} onChange={e=>{setPass(e.target.value);setErr("");}} onKeyDown={e=>e.key==="Enter"&&doI()} className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500" placeholder="••••••••"/></div></div>
            {err&&<p className="text-red-400 text-xs">{err}</p>}
            <button onClick={doI} className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 text-white font-semibold py-2.5 rounded-lg text-sm">Entrar</button>
          </div>
        ):(
          <div className="space-y-3">
            <div><label className="block text-[10px] text-slate-400 mb-1.5 uppercase tracking-wider font-semibold">Nome</label>
              <input value={vN} onChange={e=>{setVN(e.target.value);setErr("");}} onKeyDown={e=>e.key==="Enter"&&doV()} className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500" placeholder="Ex: Maria Silva"/></div>
            <div><label className="block text-[10px] text-slate-400 mb-1.5 uppercase tracking-wider font-semibold">E-mail</label>
              <input type="email" value={vE} onChange={e=>{setVE(e.target.value);setErr("");}} onKeyDown={e=>e.key==="Enter"&&doV()} className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500" placeholder="seu@email.com"/></div>
            <div className="bg-slate-800/50 border border-slate-800 rounded-lg p-2.5 text-[11px] text-slate-400"><strong className="text-slate-300">Visitante:</strong> vê dashboard, atividades (resumo) e desempenho. Sem comentários internos.</div>
            {err&&<p className="text-red-400 text-xs">{err}</p>}
            <button onClick={doV} className="w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 text-white font-semibold py-2.5 rounded-lg text-sm border border-slate-600">Entrar como visitante</button>
          </div>
        )}
        <p className="text-center text-slate-600 text-[11px] mt-5">IFSP Piracicaba · Automação Industrial</p>
      </div>
    </div>
  );
}

// APP
export default function App(){
  const[user,setUser]=useState(null);
  const[state,setState]=useState({docs:[],comments:{},history:[],presence:{},users:INITIAL_USERS,cancelReqs:{}});
  const[tab,setTab]=useState("dashboard");
  const[loaded,setLoaded]=useState(false);
  const[syncing,setSyncing]=useState(false);
  const ref=useRef(state); ref.current=state;

  const save=useCallback(async ns=>{
    lcSet("state",ns);
    if(SUPABASE_OK){setSyncing(true);await sbSet(ns);setSyncing(false);}
  },[]);

  // Carregamento inicial
  useEffect(()=>{
    let cancelled=false;
    (async()=>{
      try{
        const remote=SUPABASE_OK?await sbGet():null;
        const local=lcGet("state");
        let s=remote||local;
        if(!s)s={docs:INITIAL_DOCS.map(d=>({...d,...blankDoc()})),comments:{},history:[],presence:{},users:INITIAL_USERS,cancelReqs:{}};
        s.users=s.users||INITIAL_USERS;
        s.cancelReqs=s.cancelReqs||{};
        s.docs=s.docs.map(d=>({...blankDoc(),...d}));
        if(!cancelled){setState(s);setLoaded(true);}
      }catch{
        if(!cancelled){setState({docs:INITIAL_DOCS.map(d=>({...d,...blankDoc()})),comments:{},history:[],presence:{},users:INITIAL_USERS,cancelReqs:{}});setLoaded(true);}
      }
    })();
    return()=>{cancelled=true;};
  },[]);

  // Heartbeat
  useEffect(()=>{
    if(!user||!loaded)return;
    const tick=async()=>{
      const now=Date.now();
      const p={...(ref.current.presence||{})};
      Object.keys(p).forEach(k=>{if(now-(p[k]?.ts||0)>90000)delete p[k];});
      p[user.name]={ts:now,role:user.role,grupo:user.grupo};
      const ns={...ref.current,presence:p};
      setState(ns);save(ns);
    };
    tick();const i=setInterval(tick,30000);return()=>clearInterval(i);
  },[user,loaded,save]);

  // Sync remoto
  useEffect(()=>{
    if(!user||!loaded||!SUPABASE_OK)return;
    const sync=async()=>{
      const r=await sbGet();
      if(r){const my=ref.current.presence?.[user.name];const m={...r};if(my)m.presence={...(r.presence||{}),[user.name]:my};setState(m);}
    };
    const i=setInterval(sync,8000);return()=>clearInterval(i);
  },[user,loaded]);

  const push=(fn)=>{const ns=fn(ref.current);setState(ns);save(ns);return ns;};
  const addHist=(ns,entry)=>({...ns,history:[entry,...(ns.history||[])].slice(0,1000)});
  const now=()=>Date.now();

  // STATUS
  const updateStatus=useCallback((docId,newS)=>{
    const doc=ref.current.docs.find(d=>d.id===docId);
    if(!doc)return{ok:false,msg:"Documento não encontrado"};
    if(doc.status==="Cancelado")return{ok:false,msg:"Documento cancelado. Reative-o primeiro."};
    const canGrp=user.role==="gestor"||(user.role==="integrante"&&doc.grupo===user.grupo);
    if(!canGrp)return{ok:false,msg:"Você só pode alterar documentos do seu grupo"};
    if(newS==="Concluído"&&user.role!=="gestor")return{ok:false,msg:"Apenas a gestão pode marcar como Concluído"};
    if(newS==="Cancelado"&&user.role!=="gestor")return{ok:false,msg:"Use 'Pedir cancelamento'"};
    if(newS==="Em revisão"&&user.role!=="gestor"){
      if(!doc.responsavel)return{ok:false,msg:"Defina um responsável antes de enviar para revisão"};
      if(doc.responsavel!==user.name)return{ok:false,msg:`Apenas o responsável (${doc.responsavel}) pode enviar para revisão`};
    }
    const up={status:newS};
    if(newS==="Em revisão"){up.dataRevisao=now();up.prazo=now()+48*3600000;}
    if(newS==="Concluído")up.dataConclusao=now();
    push(s=>addHist({...s,docs:s.docs.map(d=>d.id===docId?{...d,...up}:d)},{ts:now(),user:user.name,action:"status_change",docId,docName:doc.doc,from:doc.status,to:newS,grupo:doc.grupo,isGestor:user.role==="gestor",responsavel:doc.responsavel}));
    return{ok:true};
  },[user,save]);

  // RESPONSÁVEL
  const updateResp=useCallback((docId,resp)=>{
    const doc=ref.current.docs.find(d=>d.id===docId);if(!doc)return{ok:false};
    const canGrp=user.role==="gestor"||(user.role==="integrante"&&doc.grupo===user.grupo);
    if(!canGrp)return{ok:false,msg:"Você só pode alterar documentos do seu grupo"};
    push(s=>addHist({...s,docs:s.docs.map(d=>d.id===docId?{...d,responsavel:resp||null}:d)},{ts:now(),user:user.name,action:"responsavel_change",docId,docName:doc.doc,from:doc.responsavel,to:resp,grupo:doc.grupo,isGestor:user.role==="gestor"}));
    return{ok:true};
  },[user,save]);

  // PRAZO
  const updatePrazo=useCallback((docId,prazo,obs)=>{
    if(user.role!=="gestor")return{ok:false};
    const doc=ref.current.docs.find(d=>d.id===docId);if(!doc)return{ok:false};
    const eraAtras=doc.prazo&&now()>doc.prazo&&doc.status!=="Concluído"&&doc.status!=="Cancelado";
    const up={prazo};if(!doc.primeiroPrazo)up.primeiroPrazo=prazo;
    push(s=>addHist({...s,docs:s.docs.map(d=>d.id===docId?{...d,...up}:d)},{ts:now(),user:user.name,action:"prazo_change",docId,docName:doc.doc,from:doc.prazo,to:prazo,isFirstPrazo:!doc.primeiroPrazo,reagendamentoAposVencido:!!eraAtras,responsavelDoDoc:doc.responsavel,observacao:obs||"",grupo:doc.grupo,isGestor:true}));
    return{ok:true};
  },[user,save]);

  // GRUPO
  const updateGrupo=useCallback((docId,grupo,obs)=>{
    if(user.role!=="gestor")return{ok:false};
    const doc=ref.current.docs.find(d=>d.id===docId);if(!doc)return{ok:false};
    push(s=>addHist({...s,docs:s.docs.map(d=>d.id===docId?{...d,grupo}:d)},{ts:now(),user:user.name,action:"grupo_change",docId,docName:doc.doc,from:doc.grupo,to:grupo,observacao:obs||"",isGestor:true}));
    return{ok:true};
  },[user,save]);

  // COMENTÁRIO
  const addComment=useCallback((docId,text)=>{
    if(!text.trim()||user.role==="visitante")return;
    const doc=ref.current.docs.find(d=>d.id===docId);
    push(s=>{const nc={...s.comments,[docId]:[...(s.comments[docId]||[]),{user:user.name,text,ts:now()}]};
      return addHist({...s,comments:nc},{ts:now(),user:user.name,action:"comment",docId,docName:doc?.doc,text,grupo:doc?.grupo});});
  },[user,save]);

  // ADICIONAR DOC
  const addDoc=useCallback((d)=>{
    if(user.role!=="gestor")return{ok:false};
    if(ref.current.docs.find(x=>x.id===d.id))return{ok:false,msg:"ID já existe"};
    push(s=>addHist({...s,docs:[...s.docs,{...d,...blankDoc()}]},{ts:now(),user:user.name,action:"doc_added",docId:d.id,docName:d.doc,grupo:d.grupo,isGestor:true}));
    return{ok:true};
  },[user,save]);

  // REMOVER DOC
  const removeDoc=useCallback((docId)=>{
    if(user.role!=="gestor")return{ok:false};
    const doc=ref.current.docs.find(d=>d.id===docId);if(!doc)return{ok:false};
    push(s=>addHist({...s,docs:s.docs.filter(d=>d.id!==docId)},{ts:now(),user:user.name,action:"doc_removed",docId,docName:doc.doc,grupo:doc.grupo,isGestor:true}));
    return{ok:true};
  },[user,save]);

  // CANCELAR / PEDIR
  const cancelDoc=useCallback((docId,motivo)=>{
    const doc=ref.current.docs.find(d=>d.id===docId);if(!doc)return{ok:false};
    if(user.role==="gestor"){
      push(s=>{const nr={...s.cancelReqs};delete nr[docId];
        return addHist({...s,docs:s.docs.map(d=>d.id===docId?{...d,status:"Cancelado"}:d),cancelReqs:nr},{ts:now(),user:user.name,action:"cancel_approved",docId,docName:doc.doc,motivo:motivo||"Cancelado pela gestão",grupo:doc.grupo,isGestor:true});});
      return{ok:true,direct:true};
    }
    if(doc.grupo!==user.grupo)return{ok:false,msg:"Você só pode pedir cancelamento de documentos do seu grupo"};
    push(s=>addHist({...s,cancelReqs:{...s.cancelReqs,[docId]:{user:user.name,motivo,ts:now()}}},{ts:now(),user:user.name,action:"cancel_request",docId,docName:doc.doc,motivo,grupo:doc.grupo}));
    return{ok:true,direct:false};
  },[user,save]);

  // APROVAR CANCELAMENTO
  const approveCancel=useCallback((docId,aprovar)=>{
    if(user.role!=="gestor")return{ok:false};
    const doc=ref.current.docs.find(d=>d.id===docId);
    const req=ref.current.cancelReqs[docId];
    if(!doc||!req)return{ok:false};
    push(s=>{const nr={...s.cancelReqs};delete nr[docId];
      const nd=aprovar?s.docs.map(d=>d.id===docId?{...d,status:"Cancelado"}:d):s.docs;
      return addHist({...s,docs:nd,cancelReqs:nr},{ts:now(),user:user.name,action:aprovar?"cancel_approved":"cancel_rejected",docId,docName:doc.doc,motivo:req.motivo,requestedBy:req.user,grupo:doc.grupo,isGestor:true});});
    return{ok:true};
  },[user,save]);

  // REATIVAR
  const reativar=useCallback((docId)=>{
    if(user.role!=="gestor")return{ok:false};
    const doc=ref.current.docs.find(d=>d.id===docId);if(!doc)return{ok:false};
    push(s=>addHist({...s,docs:s.docs.map(d=>d.id===docId?{...d,status:"Pendente"}:d)},{ts:now(),user:user.name,action:"doc_reactivated",docId,docName:doc.doc,grupo:doc.grupo,isGestor:true}));
    return{ok:true};
  },[user,save]);

  // USUÁRIOS
  const addUser=useCallback((d)=>{
    if(user.role!=="gestor")return{ok:false};
    if(ref.current.users[d.name])return{ok:false,msg:"Já existe usuário com este nome"};
    const pwd=gerarSenha(d.name);
    push(s=>addHist({...s,users:{...s.users,[d.name]:{role:d.role,grupo:d.grupo,pwd,ativo:true}}},{ts:now(),user:user.name,action:"user_added",targetUser:d.name,role:d.role,grupo:d.grupo,isGestor:true}));
    return{ok:true,pwd};
  },[user,save]);

  const editUser=useCallback((oldName,d)=>{
    if(user.role!=="gestor")return{ok:false};
    const u=ref.current.users[oldName];if(!u)return{ok:false};
    push(s=>{const nu={...s.users};const chg=[];
      const nn=d.newName?.trim();
      if(nn&&nn!==oldName){if(nu[nn])return{ok:false,msg:"Nome já em uso"};delete nu[oldName];nu[nn]={...u};chg.push(`nome→${nn}`);}
      const fn=nn||oldName;
      if(d.role&&d.role!==u.role){nu[fn]={...nu[fn],role:d.role};if(d.role==="gestor")nu[fn].grupo="Gestão";chg.push(`tipo→${d.role}`);}
      if(d.grupo&&d.grupo!==u.grupo){nu[fn]={...nu[fn],grupo:d.grupo};chg.push(`grupo→${d.grupo}`);}
      if(d.pwd&&d.pwd.trim()){nu[fn]={...nu[fn],pwd:d.pwd.trim()};chg.push("senha alterada");}
      const ndocs=nn?s.docs.map(doc=>doc.responsavel===oldName?{...doc,responsavel:nn}:doc):s.docs;
      return addHist({...s,users:nu,docs:ndocs},{ts:now(),user:user.name,action:"user_updated",targetUser:fn,changes:chg.join(", "),isGestor:true});});
    return{ok:true};
  },[user,save]);

  const toggleActive=useCallback((name)=>{
    if(user.role!=="gestor")return{ok:false};
    const u=ref.current.users[name];if(!u)return{ok:false};
    push(s=>addHist({...s,users:{...s.users,[name]:{...u,ativo:!u.ativo}}},{ts:now(),user:user.name,action:u.ativo?"user_inactivated":"user_reactivated",targetUser:name,isGestor:true}));
    return{ok:true};
  },[user,save]);

  const removeUser=useCallback((name)=>{
    if(user.role!=="gestor")return{ok:false};
    push(s=>{const nu={...s.users};delete nu[name];
      const nd=s.docs.map(d=>d.responsavel===name?{...d,responsavel:null}:d);
      return addHist({...s,users:nu,docs:nd},{ts:now(),user:user.name,action:"user_removed",targetUser:name,isGestor:true});});
    return{ok:true};
  },[user,save]);

  if(!user)return<Login onLogin={setUser} users={state.users}/>;
  if(!loaded)return<div className="min-h-screen bg-slate-950 flex items-center justify-center"><div className="flex items-center gap-3 text-slate-400"><div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"/><span className="text-sm">Carregando...</span></div></div>;

  const isV=user.role==="visitante";
  const pCancel=Object.keys(state.cancelReqs||{}).length;

  return(
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <TopBar user={user} presence={state.presence||{}} onLogout={()=>setUser(null)} tab={tab} setTab={setTab} syncing={syncing} pCancel={pCancel}/>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
        {tab==="dashboard"&&<Dashboard docs={state.docs} history={state.history} cancelReqs={state.cancelReqs} isGestor={user.role==="gestor"}/>}
        {tab==="documentos"&&<DocList state={state} user={user} onStatus={updateStatus} onComment={addComment} onPrazo={updatePrazo} onResp={updateResp} onGrupo={updateGrupo} onAddDoc={addDoc} onRemoveDoc={removeDoc} onCancel={cancelDoc} onApprove={approveCancel} onReativar={reativar}/>}
        {tab==="atividades"&&<Atividades history={state.history} isV={isV} users={state.users}/>}
        {tab==="desempenho"&&<Desempenho docs={state.docs} history={state.history} users={state.users}/>}
        {tab==="usuarios"&&user.role==="gestor"&&<Usuarios users={state.users} currentUser={user} onAdd={addUser} onEdit={editUser} onToggle={toggleActive} onRemove={removeUser}/>}
        {tab==="exportar"&&user.role==="gestor"&&<Export state={state}/>}
      </main>
    </div>
  );
}

// TOPBAR
function TopBar({user,presence,onLogout,tab,setTab,syncing,pCancel}){
  const[showOnline,setShowOnline]=useState(false);
  const online=Object.entries(presence).filter(([_,v])=>Date.now()-(v?.ts||0)<90000);
  const isV=user.role==="visitante";
  const tabs=[
    {id:"dashboard",label:"Dashboard",icon:LayoutDashboard,show:true},
    {id:"documentos",label:"Documentos",icon:ListChecks,show:true,badge:pCancel>0&&user.role==="gestor"?pCancel:null},
    {id:"atividades",label:"Atividades",icon:History,show:true},
    {id:"desempenho",label:"Desempenho",icon:Award,show:true},
    {id:"usuarios",label:"Usuários",icon:Settings,show:user.role==="gestor"},
    {id:"exportar",label:"Exportar",icon:Download,show:user.role==="gestor"},
  ].filter(t=>t.show);

  const badge=()=>{
    if(user.role==="gestor")return<div className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 bg-purple-900/40 border border-purple-700/50 rounded-lg text-xs"><Shield className="w-3.5 h-3.5 text-purple-300"/><span className="text-purple-200 font-medium">{user.name.split(" ")[0]}</span><span className="text-[10px] bg-purple-700/60 text-purple-100 px-1.5 py-0.5 rounded font-bold tracking-wider">GESTÃO</span></div>;
    if(isV)return<div className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs"><UserCheck className="w-3.5 h-3.5 text-slate-400"/><span className="text-slate-300 font-medium">{user.name}</span><span className="text-[10px] text-slate-500">(visitante)</span></div>;
    return<div className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 bg-slate-800 rounded-lg text-xs"><User className="w-3.5 h-3.5 text-slate-400"/><span className="text-slate-300 font-medium">{user.name}</span></div>;
  };

  return(
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center flex-shrink-0"><Shield className="w-4 h-4 text-white"/></div>
            <div className="hidden sm:block"><div className="text-[10px] text-slate-500 leading-tight uppercase tracking-wider">IFSP Piracicaba</div><div className="text-sm font-bold text-white leading-tight">Extensão 2026</div></div>
          </div>
          <div className="flex items-center gap-2">
            {syncing&&<RefreshCw className="w-3.5 h-3.5 text-emerald-400 animate-spin"/>}
            <button onClick={()=>setShowOnline(!showOnline)} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"/><span className="text-slate-300 font-medium">{online.length}</span><span className="hidden sm:inline text-slate-400">online</span>
            </button>
            {badge()}
            <button onClick={onLogout} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"><LogOut className="w-4 h-4"/></button>
          </div>
        </div>
        <div className="flex items-center gap-1 -mb-px overflow-x-auto">
          {tabs.map(t=>{const I=t.icon;return(
            <button key={t.id} onClick={()=>setTab(t.id)} className={`flex items-center gap-2 px-3 py-2.5 text-xs font-medium border-b-2 whitespace-nowrap relative ${tab===t.id?"border-emerald-500 text-emerald-400":"border-transparent text-slate-400 hover:text-slate-200"}`}>
              <I className="w-3.5 h-3.5"/>{t.label}
              {t.badge&&<span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-1">{t.badge}</span>}
            </button>
          );})}
        </div>
      </div>
      {showOnline&&<>
        <div className="fixed inset-0 z-30" onClick={()=>setShowOnline(false)}/>
        <div className="absolute right-4 top-14 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl p-3 w-72 z-40 max-h-96 overflow-y-auto">
          <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2 flex items-center gap-1.5"><Users className="w-3 h-3"/>Online agora ({online.length})</div>
          <div className="space-y-1.5">{online.map(([n,v])=>(
            <div key={n} className="flex items-center gap-2 text-xs py-1"><div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"/><span className="text-slate-200 flex-1 truncate">{n}</span>
              {v.role==="gestor"&&<span className="text-[9px] bg-purple-900/50 text-purple-300 px-1.5 py-0.5 rounded font-bold tracking-wider">GESTÃO</span>}
              {v.role==="visitante"&&<span className="text-[9px] text-slate-500">visitante</span>}
            </div>
          ))}</div>
        </div>
      </>}
    </header>
  );
}

// DASHBOARD
function Dashboard({docs,history,cancelReqs,isGestor}){
  const s=useMemo(()=>{
    const ativos=docs.filter(d=>d.status!=="Cancelado");
    const tot=ativos.length||1;
    const bySt=STATUS_LIST.reduce((a,k)=>{a[k]=docs.filter(d=>d.status===k).length;return a},{});
    const concl=bySt["Concluído"]||0;
    const grupos=GRUPOS.map(g=>{const l=ativos.filter(d=>d.grupo===g);const c=l.filter(d=>d.status==="Concluído").length;
      return{nome:g,total:l.length,concluido:c,pct:Math.round(c/(l.length||1)*100),atrasados:l.filter(d=>isAtrasado(d)).length,
        emA:l.filter(d=>d.status==="Em andamento").length,emR:l.filter(d=>d.status==="Em revisão").length,pend:l.filter(d=>d.status==="Pendente").length};});
    const cats=[...new Set(docs.map(d=>d.cat))].map(c=>{const l=ativos.filter(d=>d.cat===c);return{name:c.replace(/^\d+\.\s*/,""),total:l.length,concluido:l.filter(d=>d.status==="Concluído").length};});
    const comP=ativos.filter(d=>d.primeiroPrazo);
    const np=comP.filter(d=>noPrazo(d)===true).length;
    const fp=comP.filter(d=>(d.status==="Concluído"&&d.dataConclusao>d.primeiroPrazo)||(d.status!=="Concluído"&&Date.now()>d.primeiroPrazo)).length;
    const pp=comP.filter(d=>d.status!=="Concluído"&&Date.now()<=d.primeiroPrazo).length;
    return{total:ativos.length,bySt,concl,pct:Math.round(concl/tot*100),grupos,cats,
      atrasados:docs.filter(d=>isAtrasado(d)).length,semPrazo:ativos.filter(d=>!d.prazo&&d.status!=="Concluído").length,
      semResp:ativos.filter(d=>!d.responsavel&&d.status!=="Concluído").length,
      cancelados:bySt["Cancelado"]||0,pont:{np,fp,pp,tot:comP.length}};
  },[docs]);

  const pie=STATUS_LIST.filter(k=>s.bySt[k]>0).map(k=>({name:k,value:s.bySt[k]}));
  const pont=[{name:"Concluído no 1º prazo",value:s.pont.np,fill:"#10B981"},{name:"Fora do 1º prazo",value:s.pont.fp,fill:"#EF4444"},{name:"Ainda no 1º prazo",value:s.pont.pp,fill:"#3B82F6"},{name:"Cancelados",value:s.cancelados,fill:"#6B7280"}].filter(d=>d.value>0);
  const pC=Object.keys(cancelReqs||{}).length;

  return(
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div><h1 className="text-2xl font-bold text-white">Dashboard</h1><p className="text-sm text-slate-400">{s.total} ativos · {s.cancelados} cancelados</p></div>
        <div className="text-xs text-slate-500">{SUPABASE_OK?"Sincronização em tempo real":"Modo offline"}</div>
      </div>

      {(s.atrasados>0||s.semPrazo>0||s.semResp>0||(isGestor&&pC>0))&&(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {s.atrasados>0&&<div className="bg-red-950/30 border border-red-900/50 rounded-xl p-4 flex items-center gap-3"><AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0"/><div><div className="text-base font-bold text-red-300">{s.atrasados} atrasado{s.atrasados>1?"s":""}</div><div className="text-xs text-red-400/70">Prazo vencido</div></div></div>}
          {s.semPrazo>0&&<div className="bg-amber-950/30 border border-amber-900/50 rounded-xl p-4 flex items-center gap-3"><CalendarDays className="w-8 h-8 text-amber-400 flex-shrink-0"/><div><div className="text-base font-bold text-amber-300">{s.semPrazo} sem prazo</div><div className="text-xs text-amber-400/70">Configurar prazo</div></div></div>}
          {s.semResp>0&&<div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center gap-3"><UserPlus className="w-8 h-8 text-slate-400 flex-shrink-0"/><div><div className="text-base font-bold text-slate-300">{s.semResp} sem responsável</div><div className="text-xs text-slate-500">Definir responsável</div></div></div>}
          {isGestor&&pC>0&&<div className="bg-purple-950/30 border border-purple-900/50 rounded-xl p-4 flex items-center gap-3"><Ban className="w-8 h-8 text-purple-400 flex-shrink-0"/><div><div className="text-base font-bold text-purple-300">{pC} pedido{pC>1?"s":""} de cancelamento</div><div className="text-xs text-purple-400/70">Aguardando aprovação</div></div></div>}
        </div>
      )}

      <div className="bg-gradient-to-br from-slate-900 to-slate-900/50 border border-slate-800 rounded-xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-3">
          <div><div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Progresso geral</div>
            <div className="text-3xl sm:text-4xl font-bold text-white mt-1">{s.pct}%</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.concl} de {s.total} concluídos</div></div>
          <div className="w-16 h-16 sm:w-20 sm:h-20 relative">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" stroke="#1E293B" strokeWidth="10" fill="none"/>
              <circle cx="50" cy="50" r="42" stroke="#10B981" strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray={`${(s.pct/100)*264} 264`} style={{transition:"stroke-dasharray .8s ease"}}/>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-emerald-400"/></div>
          </div>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-700" style={{width:`${s.pct}%`}}/></div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {STATUS_LIST.map(k=>{const c=SC[k];const I=c.ic;return(
          <div key={k} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2"><I className="w-4 h-4" style={{color:c.tx}}/><div className="text-[10px] text-slate-500 uppercase tracking-wider">{k}</div></div>
            <div className="text-2xl font-bold text-white">{s.bySt[k]}</div>
          </div>
        );})}
      </div>

      <div><h2 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Por grupo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {s.grupos.map(g=>{const c=GC[g.nome];return(
            <div key={g.nome} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2"><div className="text-xs font-semibold uppercase tracking-wider" style={{color:c.tx}}>{g.nome}</div><div className="text-xs text-slate-500">{g.concluido}/{g.total}</div></div>
              <div className="flex items-baseline gap-2"><div className="text-2xl font-bold text-white">{g.pct}%</div>
                {g.atrasados>0&&<span className="text-[10px] bg-red-950/50 text-red-400 px-1.5 py-0.5 rounded font-semibold flex items-center gap-1"><AlertTriangle className="w-2.5 h-2.5"/>{g.atrasados}</span>}
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-3 mt-2"><div className="h-full rounded-full transition-all duration-700" style={{width:`${g.pct}%`,backgroundColor:c.ch}}/></div>
              <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                <div className="flex justify-between bg-slate-800/50 rounded px-2 py-1"><span className="text-slate-500">Pend.</span><span className="text-slate-300 font-semibold">{g.pend}</span></div>
                <div className="flex justify-between bg-slate-800/50 rounded px-2 py-1"><span className="text-slate-500">Andam.</span><span className="text-slate-300 font-semibold">{g.emA}</span></div>
                <div className="flex justify-between bg-slate-800/50 rounded px-2 py-1"><span className="text-slate-500">Revis.</span><span className="text-slate-300 font-semibold">{g.emR}</span></div>
                <div className="flex justify-between bg-emerald-950/40 rounded px-2 py-1"><span className="text-emerald-500">Concl.</span><span className="text-emerald-300 font-semibold">{g.concluido}</span></div>
              </div>
            </div>
          );})}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-slate-200 mb-4">Distribuição por status</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart><Pie data={pie} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={3}>
              {pie.map((e,i)=><Cell key={i} fill={SC[e.name]?.bd||"#64748B"} stroke="#0F172A" strokeWidth={2}/>)}
            </Pie><Tooltip contentStyle={{background:"#1E293B",border:"1px solid #334155",borderRadius:8,fontSize:12}}/>
            <Legend wrapperStyle={{fontSize:11}} iconType="circle" formatter={v=><span style={{color:"#94A3B8"}}>{v}</span>}/></PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-slate-200 mb-1 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-emerald-400"/>Pontualidade no 1º prazo</h3>
          <p className="text-[11px] text-slate-500 mb-3">{s.pont.tot} com prazo definido</p>
          {pont.length===0?<div className="h-[200px] flex items-center justify-center text-xs text-slate-500">Nenhum prazo definido</div>:(
            <ResponsiveContainer width="100%" height={200}>
              <PieChart><Pie data={pont} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={80} paddingAngle={3}>
                {pont.map((e,i)=><Cell key={i} fill={e.fill} stroke="#0F172A" strokeWidth={2}/>)}
              </Pie><Tooltip contentStyle={{background:"#1E293B",border:"1px solid #334155",borderRadius:8,fontSize:12}}/>
              <Legend wrapperStyle={{fontSize:11}} iconType="circle" formatter={v=><span style={{color:"#94A3B8"}}>{v}</span>}/></PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-slate-200 mb-4">Conclusão por categoria</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={s.cats} layout="vertical" margin={{left:10,right:10}}>
            <XAxis type="number" stroke="#475569" tick={{fontSize:10}}/><YAxis type="category" dataKey="name" stroke="#94A3B8" tick={{fontSize:10}} width={150}/>
            <Tooltip contentStyle={{background:"#1E293B",border:"1px solid #334155",borderRadius:8,fontSize:12}}/>
            <Bar dataKey="concluido" fill="#10B981" radius={[0,2,2,0]} name="Concluídos"/>
            <Bar dataKey="total" fill="#334155" radius={[0,2,2,0]} name="Total"/>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-slate-200 mb-3">Atividades recentes</h3>
        {history.slice(0,5).length===0?<p className="text-xs text-slate-500">Nenhuma atividade</p>:
          <div className="space-y-2">{history.slice(0,5).map((a,i)=><AItem key={i} item={a} compact/>)}</div>}
      </div>
    </div>
  );
}

// DOCUMENTOS
function DocList({state,user,onStatus,onComment,onPrazo,onResp,onGrupo,onAddDoc,onRemoveDoc,onCancel,onApprove,onReativar}){
  const{docs,comments,history,cancelReqs,users}=state;
  const[q,setQ]=useState("");const[fG,setFG]=useState("Todos");const[fS,setFS]=useState("Ativos");const[fA,setFA]=useState(false);
  const[exp,setExp]=useState(null);const[showAdd,setShowAdd]=useState(false);

  const fil=useMemo(()=>docs.filter(d=>{
    if(q&&!d.doc.toLowerCase().includes(q.toLowerCase())&&!d.id.includes(q))return false;
    if(fG!=="Todos"&&d.grupo!==fG)return false;
    if(fS==="Ativos"){if(d.status==="Cancelado")return false;}else if(fS!=="Todos"){if(d.status!==fS)return false;}
    if(fA&&!isAtrasado(d))return false;
    return true;
  }),[docs,q,fG,fS,fA]);

  const grouped=useMemo(()=>{const g={};fil.forEach(d=>{(g[d.cat]=g[d.cat]||[]).push(d);});return g;},[fil]);

  return(
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-2 flex-wrap">
        <div><h1 className="text-2xl font-bold text-white">Documentos</h1><p className="text-sm text-slate-400">{fil.length} de {docs.length}</p></div>
        {user.role==="gestor"&&<button onClick={()=>setShowAdd(true)} className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg"><Plus className="w-4 h-4"/>Novo</button>}
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
        <div className="relative flex-1"><Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500"/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar..." className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-emerald-500"/></div>
        <select value={fG} onChange={e=>setFG(e.target.value)} className="bg-slate-800 border border-slate-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500">
          <option value="Todos">Todos os grupos</option>{GRUPOS.map(g=><option key={g}>{g}</option>)}</select>
        <select value={fS} onChange={e=>setFS(e.target.value)} className="bg-slate-800 border border-slate-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500">
          <option value="Ativos">Só ativos</option><option value="Todos">Todos (com cancelados)</option>
          {STATUS_LIST.map(s=><option key={s}>{s}</option>)}</select>
        <button onClick={()=>setFA(!fA)} className={`px-3 py-2 text-xs font-semibold rounded-lg border flex items-center gap-1.5 ${fA?"bg-red-900/40 border-red-700 text-red-300":"bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200"}`}>
          <AlertTriangle className="w-3.5 h-3.5"/>Atrasados</button>
      </div>
      {Object.keys(grouped).sort().map(cat=>(
        <div key={cat} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-4 py-2.5 bg-slate-800/50 border-b border-slate-800"><h2 className="text-sm font-bold text-emerald-400">{cat}</h2></div>
          <div className="divide-y divide-slate-800">
            {grouped[cat].map(d=>(
              <DocRow key={d.id} doc={d} user={user} users={users}
                comments={comments[d.id]||[]} history={history.filter(h=>h.docId===d.id)}
                cancelReq={cancelReqs?.[d.id]} expanded={exp===d.id} onToggle={()=>setExp(exp===d.id?null:d.id)}
                onStatus={onStatus} onComment={onComment} onPrazo={onPrazo} onResp={onResp} onGrupo={onGrupo}
                onRemoveDoc={onRemoveDoc} onCancel={onCancel} onApprove={onApprove} onReativar={onReativar}/>
            ))}
          </div>
        </div>
      ))}
      {fil.length===0&&<div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center text-slate-500 text-sm">Nenhum documento encontrado</div>}
      {showAdd&&<AddDocModal onClose={()=>setShowAdd(false)} onAdd={onAddDoc} existingDocs={docs}/>}
    </div>
  );
}

function AddDocModal({onClose,onAdd,existingDocs}){
  const[d,setD]=useState({id:"",doc:"",cat:"",dif:"Médio",grupo:"Doc. A"});const[err,setErr]=useState("");
  const cats=[...new Set(existingDocs.map(x=>x.cat))].sort();
  const go=()=>{
    if(!d.id.trim())return setErr("ID obrigatório");if(!d.doc.trim())return setErr("Nome obrigatório");if(!d.cat.trim())return setErr("Categoria obrigatória");
    if(existingDocs.find(x=>x.id===d.id))return setErr("ID já existe");
    const r=onAdd(d);if(r.ok)onClose();else setErr(r.msg||"Erro");
  };
  return(
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-bold text-white flex items-center gap-2"><Plus className="w-5 h-5 text-emerald-400"/>Novo documento</h2><button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5"/></button></div>
        <div className="space-y-3">
          <div><label className="block text-[10px] text-slate-400 mb-1 uppercase">ID (ex: 10.1)</label><input value={d.id} onChange={e=>setD({...d,id:e.target.value})} className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"/></div>
          <div><label className="block text-[10px] text-slate-400 mb-1 uppercase">Nome do documento</label><input value={d.doc} onChange={e=>setD({...d,doc:e.target.value})} className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"/></div>
          <div><label className="block text-[10px] text-slate-400 mb-1 uppercase">Categoria</label>
            <input list="cats" value={d.cat} onChange={e=>setD({...d,cat:e.target.value})} placeholder="Selecione ou crie nova" className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"/>
            <datalist id="cats">{cats.map(c=><option key={c} value={c}/>)}</datalist></div>
          <div className="grid grid-cols-2 gap-2">
            <div><label className="block text-[10px] text-slate-400 mb-1 uppercase">Dificuldade</label>
              <select value={d.dif} onChange={e=>setD({...d,dif:e.target.value})} className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500">
                <option>Fácil</option><option>Médio</option><option>Difícil</option></select></div>
            <div><label className="block text-[10px] text-slate-400 mb-1 uppercase">Grupo</label>
              <select value={d.grupo} onChange={e=>setD({...d,grupo:e.target.value})} className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500">
                {GRUPOS.map(g=><option key={g}>{g}</option>)}</select></div>
          </div>
          {err&&<p className="text-red-400 text-xs">{err}</p>}
          <div className="flex gap-2 pt-2">
            <button onClick={go} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold py-2 rounded-lg">Criar</button>
            <button onClick={onClose} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold py-2 rounded-lg">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DocRow({doc,user,users,comments,history,cancelReq,expanded,onToggle,onStatus,onComment,onPrazo,onResp,onGrupo,onRemoveDoc,onCancel,onApprove,onReativar}){
  const[nc,setNC]=useState("");const[sMenu,setSMenu]=useState(false);const[eprazo,setEP]=useState(false);const[egrupo,setEG]=useState(false);
  const[np,setNP]=useState("");const[op,setOP]=useState("");const[ng,setNG]=useState("");const[og,setOG]=useState("");
  const[fb,setFB]=useState(null);const[cModal,setCModal]=useState(false);const[cMot,setCMot]=useState("");const[delModal,setDel]=useState(false);

  const c=SC[doc.status];const SIcon=c.ic;const gc=GC[doc.grupo]||GC["Doc. A"];const dc=DC[doc.dif]||DC["Médio"];
  const atras=isAtrasado(doc);const canc=doc.status==="Cancelado";
  const isG=user.role==="gestor";const isV=user.role==="visitante";
  const canGrp=isG||(user.role==="integrante"&&doc.grupo===user.grupo);
  const intList=Object.keys(users||{});

  const doStatus=s=>{setSMenu(false);if(s===doc.status)return;const r=onStatus(doc.id,s);if(!r.ok){setFB({t:"err",m:r.msg});setTimeout(()=>setFB(null),4000);}else if(user.role==="integrante"){setFB({t:"inf",m:"Status alterado. Gestores notificados."});setTimeout(()=>setFB(null),4000);}};
  const doComment=()=>{if(!nc.trim())return;onComment(doc.id,nc);setNC("");};
  const doSavePrazo=()=>{if(!np)return;const ts=new Date(np+"T23:59:59").getTime();onPrazo(doc.id,ts,op);setEP(false);setNP("");setOP("");};
  const doSaveGrupo=()=>{if(!ng||ng===doc.grupo){setEG(false);return;}onGrupo(doc.id,ng,og);setEG(false);setNG("");setOG("");};
  const doResp=e=>{if(!canGrp)return;const r=onResp(doc.id,e.target.value||null);if(!r.ok&&r.msg){setFB({t:"err",m:r.msg});setTimeout(()=>setFB(null),4000);}};
  const doCancel=()=>{if(!cMot.trim())return;const r=onCancel(doc.id,cMot);if(r.ok)setFB({t:"inf",m:r.direct?"Documento cancelado.":"Pedido enviado à gestão."});setCModal(false);setCMot("");};

  const sopts=STATUS_LIST.filter(s=>s!=="Cancelado"&&!(s==="Concluído"&&!isG));

  return(
    <div className={`transition-colors ${expanded?"bg-slate-800/30":"hover:bg-slate-800/20"} ${canc?"opacity-60":""}`}>
      <div className="px-4 py-3 flex items-start gap-3">
        <button onClick={onToggle} className="mt-0.5 text-slate-500 hover:text-slate-200 flex-shrink-0">{expanded?<ChevronDown className="w-4 h-4"/>:<ChevronRight className="w-4 h-4"/>}</button>
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 flex-wrap">
            <span className="text-[10px] font-mono text-slate-500 mt-0.5">{doc.id}</span>
            <span className={`text-sm font-medium ${canc?"text-slate-500 line-through":"text-white"}`}>{doc.doc}</span>
            {atras&&<span className="text-[10px] bg-red-950/60 text-red-300 px-1.5 py-0.5 rounded font-bold flex items-center gap-1 uppercase"><AlertTriangle className="w-2.5 h-2.5"/>Atrasado</span>}
            {canc&&<span className="text-[10px] bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded font-bold flex items-center gap-1 uppercase"><XCircle className="w-2.5 h-2.5"/>Cancelado</span>}
            {cancelReq&&<span className="text-[10px] bg-purple-950/60 text-purple-300 px-1.5 py-0.5 rounded font-bold flex items-center gap-1 uppercase"><Ban className="w-2.5 h-2.5"/>Cancelamento pendente</span>}
          </div>
          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider" style={{background:gc.bg,color:gc.tx}}>{doc.grupo}</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider" style={{background:dc.bg,color:dc.tx}}>{doc.dif}</span>
            {doc.prazo&&<span className={`text-[10px] flex items-center gap-1 px-1.5 py-0.5 rounded ${atras?"bg-red-950/40 text-red-400":"bg-slate-800 text-slate-400"}`}><Calendar className="w-2.5 h-2.5"/>{fmtD(doc.prazo)}</span>}
            {doc.responsavel?<span className="text-[10px] flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-800 text-slate-300"><User className="w-2.5 h-2.5"/>{doc.responsavel}</span>:
             !canc&&<span className="text-[10px] flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-950/40 text-amber-400 font-semibold"><UserPlus className="w-2.5 h-2.5"/>Sem responsável</span>}
            {!isV&&comments.length>0&&<span className="text-[10px] flex items-center gap-1 text-slate-400"><MessageSquare className="w-3 h-3"/>{comments.length}</span>}
          </div>
        </div>
        <div className="relative flex-shrink-0">
          <button onClick={()=>canGrp&&!isV&&!canc&&setSMenu(!sMenu)} disabled={!canGrp||isV||canc}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border ${canGrp&&!isV&&!canc?"cursor-pointer hover:opacity-80":"cursor-not-allowed opacity-90"}`}
            style={{background:c.bg,color:c.tx,borderColor:c.bd}}>
            <SIcon className="w-3 h-3"/><span className="hidden sm:inline">{doc.status}</span>{canGrp&&!isV&&!canc&&<ChevronDown className="w-3 h-3"/>}
          </button>
          {sMenu&&canGrp&&!isV&&!canc&&<><div className="fixed inset-0 z-10" onClick={()=>setSMenu(false)}/>
            <div className="absolute right-0 top-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl z-20 w-48 overflow-hidden">
              {sopts.map(s=>{const sc=SC[s];const I=sc.ic;return(
                <button key={s} onClick={()=>doStatus(s)} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left hover:bg-slate-700">
                  <I className="w-3.5 h-3.5" style={{color:sc.tx}}/><span className="text-slate-200">{s}</span>{doc.status===s&&<Check className="w-3 h-3 text-emerald-400 ml-auto"/>}
                </button>);})}
              {!isG&&<div className="px-3 py-1.5 text-[10px] text-slate-500 border-t border-slate-700">Concluído: só gestão</div>}
            </div>
          </>}
        </div>
      </div>

      {fb&&<div className={`mx-4 mb-2 px-3 py-1.5 rounded text-[11px] flex items-center gap-2 ${fb.t==="err"?"bg-red-950/40 border border-red-800/50 text-red-300":"bg-amber-950/30 border border-amber-800/50 text-amber-300"}`}>
        <Bell className="w-3 h-3"/><span>{fb.m}</span><button onClick={()=>setFB(null)} className="ml-auto"><X className="w-3 h-3"/></button></div>}

      {cancelReq&&isG&&<div className="mx-4 mb-2 px-3 py-2 bg-purple-950/30 border border-purple-800/50 rounded text-xs">
        <div className="flex items-start gap-2"><Ban className="w-3.5 h-3.5 text-purple-400 mt-0.5 flex-shrink-0"/>
          <div className="flex-1"><div className="text-purple-200"><strong>{cancelReq.user}</strong> pediu cancelamento:</div><p className="text-slate-400 italic mt-1">"{cancelReq.motivo}"</p></div></div>
        <div className="flex gap-2 mt-2">
          <button onClick={()=>onApprove(doc.id,true)} className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white text-[11px] rounded font-semibold">Aprovar</button>
          <button onClick={()=>onApprove(doc.id,false)} className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 text-[11px] rounded font-semibold">Rejeitar</button>
        </div>
      </div>}

      {expanded&&<div className="px-4 pb-4 ml-7 space-y-3 border-l border-slate-700 pl-4">
        {/* Responsável */}
        {!canc&&<div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5"><User className="w-3 h-3"/>Responsável</h4>
          {canGrp&&!isV?<select value={doc.responsavel||""} onChange={doResp} className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500">
            <option value="">— Sem responsável —</option>{intList.map(n=><option key={n} value={n}>{n} ({users[n]?.grupo})</option>)}</select>:
          <div className="text-xs text-slate-300">{doc.responsavel||<span className="italic text-amber-400">Sem responsável</span>}</div>}
        </div>}

        {/* Prazos */}
        {!canc&&<div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5"><CalendarDays className="w-3 h-3"/>Prazos</h4>
          <div className="bg-slate-800/30 rounded-lg p-3 grid grid-cols-2 gap-3 text-xs">
            <div><div className="text-[10px] text-slate-500 uppercase">Primeiro prazo</div><div className="text-slate-200 font-medium">{fmtD(doc.primeiroPrazo)}</div></div>
            <div><div className="text-[10px] text-slate-500 uppercase">Prazo atual</div><div className={`font-medium ${atras?"text-red-400":"text-slate-200"}`}>{fmtD(doc.prazo)}</div></div>
            {doc.dataRevisao&&<div><div className="text-[10px] text-slate-500 uppercase">Enviado p/ revisão</div><div className="text-slate-200 font-medium">{fmtDT(doc.dataRevisao)}</div></div>}
            {doc.dataConclusao&&<div><div className="text-[10px] text-slate-500 uppercase">Concluído em</div><div className="text-emerald-300 font-medium">{fmtDT(doc.dataConclusao)}</div></div>}
          </div>
          {isG&&(!eprazo?<button onClick={()=>{setEP(true);setNP(doc.prazo?new Date(doc.prazo).toISOString().slice(0,10):"");}} className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 mt-2"><Calendar className="w-3 h-3"/>{doc.prazo?"Alterar prazo":"Definir prazo"}</button>:
            <div className="bg-slate-800/50 rounded-lg p-3 space-y-2 mt-2">
              <div><label className="block text-[10px] text-slate-400 mb-1 uppercase">Novo prazo</label><input type="date" value={np} onChange={e=>setNP(e.target.value)} className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded px-2 py-1.5 focus:outline-none focus:border-emerald-500"/></div>
              <div><label className="block text-[10px] text-slate-400 mb-1 uppercase">Observação</label><input value={op} onChange={e=>setOP(e.target.value)} placeholder="Ex: Adiado por aprovação..." className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded px-2 py-1.5 focus:outline-none focus:border-emerald-500"/></div>
              <div className="flex gap-2"><button onClick={doSavePrazo} className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs rounded">Salvar</button><button onClick={()=>{setEP(false);setNP("");setOP("");}} className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded">Cancelar</button></div>
            </div>)}
        </div>}

        {/* Mudar grupo */}
        {isG&&!canc&&<div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5"><ArrowRightLeft className="w-3 h-3"/>Grupo</h4>
          {!egrupo?<button onClick={()=>{setEG(true);setNG(doc.grupo);}} className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5"><ArrowRightLeft className="w-3 h-3"/>Transferir grupo</button>:
            <div className="bg-slate-800/50 rounded-lg p-3 space-y-2">
              <div><label className="block text-[10px] text-slate-400 mb-1 uppercase">Novo grupo</label>
                <select value={ng} onChange={e=>setNG(e.target.value)} className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded px-2 py-1.5 focus:outline-none focus:border-emerald-500">
                  {GRUPOS.map(g=><option key={g}>{g}</option>)}</select></div>
              <div><label className="block text-[10px] text-slate-400 mb-1 uppercase">Motivo</label><input value={og} onChange={e=>setOG(e.target.value)} placeholder="Ex: Sinergia..." className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded px-2 py-1.5 focus:outline-none focus:border-emerald-500"/></div>
              <div className="flex gap-2"><button onClick={doSaveGrupo} className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs rounded">Transferir</button><button onClick={()=>{setEG(false);setNG("");setOG("");}} className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded">Cancelar</button></div>
            </div>}
        </div>}

        {/* Ações */}
        {!isV&&<div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5"><Settings className="w-3 h-3"/>Ações</h4>
          <div className="flex gap-2 flex-wrap">
            {!canc&&canGrp&&!cancelReq&&<button onClick={()=>setCModal(true)} className="px-3 py-1.5 bg-slate-800 hover:bg-red-900/40 border border-slate-700 hover:border-red-700 text-slate-300 hover:text-red-300 text-[11px] rounded flex items-center gap-1.5">
              <Ban className="w-3 h-3"/>{isG?"Cancelar":"Pedir cancelamento"}</button>}
            {canc&&isG&&<button onClick={()=>onReativar(doc.id)} className="px-3 py-1.5 bg-emerald-900/40 hover:bg-emerald-900/60 border border-emerald-700 text-emerald-300 text-[11px] rounded flex items-center gap-1.5"><RotateCcw className="w-3 h-3"/>Reativar</button>}
            {isG&&<button onClick={()=>setDel(true)} className="px-3 py-1.5 bg-slate-800 hover:bg-red-900/40 border border-slate-700 hover:border-red-700 text-slate-300 hover:text-red-300 text-[11px] rounded flex items-center gap-1.5"><Trash2 className="w-3 h-3"/>Excluir permanentemente</button>}
          </div>
        </div>}

        {/* Comentários */}
        {!isV&&<div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5"><MessageSquare className="w-3 h-3"/>Comentários ({comments.length})</h4>
          <div className="space-y-2 mb-2 max-h-64 overflow-y-auto">
            {comments.length===0&&<p className="text-xs text-slate-500 italic">Sem comentários</p>}
            {comments.map((c,i)=><div key={i} className="bg-slate-800/50 rounded-lg px-3 py-2">
              <div className="flex items-center justify-between mb-1"><span className="text-xs font-semibold text-emerald-400">{c.user}</span><span className="text-[10px] text-slate-500">{fmtT(c.ts)}</span></div>
              <p className="text-xs text-slate-300 whitespace-pre-wrap">{c.text}</p></div>)}
          </div>
          <div className="flex gap-2">
            <input value={nc} onChange={e=>setNC(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doComment()} placeholder="Adicionar comentário..." className="flex-1 bg-slate-800 border border-slate-700 text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"/>
            <button onClick={doComment} className="px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs rounded-lg flex items-center"><Send className="w-3 h-3"/></button>
          </div>
        </div>}

        {/* Histórico */}
        {!isV&&history.length>0&&<div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5"><History className="w-3 h-3"/>Histórico ({history.length})</h4>
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {history.slice(0,20).map((h,i)=><div key={i} className="text-[11px] text-slate-400 bg-slate-800/30 rounded px-2.5 py-1.5">
              <span className="text-slate-200 font-medium">{h.user}</span>
              {h.action==="status_change"&&<> de <span className="text-amber-400">{h.from}</span> para <span className="text-emerald-400">{h.to}</span></>}
              {h.action==="prazo_change"&&<>{h.isFirstPrazo?" definiu":" alterou"} prazo para <span className="text-emerald-400">{fmtD(h.to)}</span>{h.observacao&&<span className="text-slate-500"> — "{h.observacao}"</span>}</>}
              {h.action==="responsavel_change"&&<> definiu responsável: <span className="text-emerald-400">{h.to||"nenhum"}</span></>}
              {h.action==="grupo_change"&&<> transferiu de <span className="text-amber-400">{h.from}</span> para <span className="text-emerald-400">{h.to}</span></>}
              {h.action==="comment"&&<> comentou</>}
              {h.action==="cancel_request"&&<> pediu cancelamento</>}
              {h.action==="cancel_approved"&&<> aprovou cancelamento</>}
              {h.action==="cancel_rejected"&&<> rejeitou cancelamento</>}
              {h.action==="doc_reactivated"&&<> reativou</>}
              <span className="text-slate-600 ml-1.5">· {fmtT(h.ts)}</span>
            </div>)}
          </div>
        </div>}
      </div>}

      {/* Modal cancelamento */}
      {cModal&&<div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-bold text-white flex items-center gap-2"><Ban className="w-5 h-5 text-red-400"/>{isG?"Cancelar":"Pedir cancelamento"}</h2><button onClick={()=>setCModal(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5"/></button></div>
          <p className="text-sm text-slate-300 mb-3"><strong>{doc.id}</strong> {doc.doc}</p>
          <label className="block text-[10px] text-slate-400 mb-1 uppercase">Motivo</label>
          <textarea value={cMot} onChange={e=>setCMot(e.target.value)} rows={3} placeholder="Explique o motivo..." className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"/>
          {!isG&&<p className="text-[11px] text-amber-400 mt-2">⚠ Pedido será enviado para aprovação da gestão.</p>}
          <div className="flex gap-2 mt-4">
            <button onClick={doCancel} disabled={!cMot.trim()} className="flex-1 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-sm font-semibold py-2 rounded-lg">{isG?"Cancelar documento":"Enviar pedido"}</button>
            <button onClick={()=>{setCModal(false);setCMot("");}} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold py-2 rounded-lg">Voltar</button>
          </div>
        </div>
      </div>}

      {/* Modal excluir */}
      {delModal&&<div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-red-800 rounded-2xl shadow-2xl p-6 w-full max-w-md">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-3"><Trash2 className="w-5 h-5 text-red-400"/>Excluir permanentemente</h2>
          <p className="text-sm text-slate-300 mb-3">Excluir <strong>{doc.id} - {doc.doc}</strong>? Esta ação não pode ser desfeita.</p>
          <p className="text-[11px] text-amber-400 mb-4">💡 Prefira "Cancelar documento" para manter o histórico.</p>
          <div className="flex gap-2">
            <button onClick={()=>{onRemoveDoc(doc.id);setDel(false);}} className="flex-1 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold py-2 rounded-lg">Excluir definitivamente</button>
            <button onClick={()=>setDel(false)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold py-2 rounded-lg">Voltar</button>
          </div>
        </div>
      </div>}
    </div>
  );
}

// ATIVIDADES
function Atividades({history,isV,users}){
  const[f,setF]=useState("Todos");
  const vis=useMemo(()=>isV?history.filter(h=>["status_change","prazo_change","visit","doc_added","cancel_approved","doc_reactivated"].includes(h.action)):history,[history,isV]);
  const fil=useMemo(()=>{
    if(f==="Todos")return vis;if(f==="Visitas")return vis.filter(h=>h.action==="visit");
    if(f==="Prazos")return vis.filter(h=>h.action==="prazo_change");
    if(f==="Cancelamentos")return vis.filter(h=>["cancel_request","cancel_approved","cancel_rejected"].includes(h.action));
    if(f==="Documentos")return vis.filter(h=>["doc_added","doc_removed","doc_reactivated"].includes(h.action));
    if(f==="Usuários")return vis.filter(h=>h.action?.startsWith("user_"));
    return vis.filter(h=>h.grupo===f);
  },[vis,f]);

  return(
    <div className="space-y-4">
      <div><h1 className="text-2xl font-bold text-white">Atividades</h1><p className="text-sm text-slate-400">{isV?"Resumo de mudanças":"Histórico completo"}</p></div>
      <div className="flex gap-2 flex-wrap">
        {["Todos","Gestão","Eventos","Doc. A","Doc. B","Prazos","Cancelamentos","Documentos",!isV&&"Usuários","Visitas"].filter(Boolean).map(x=>(
          <button key={x} onClick={()=>setF(x)} className={`px-3 py-1.5 text-xs font-semibold rounded-lg border ${f===x?"bg-emerald-600 border-emerald-500 text-white":"bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"}`}>{x}</button>
        ))}
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl divide-y divide-slate-800">
        {fil.length===0?<div className="p-8 text-center text-sm text-slate-500">Nenhuma atividade</div>:fil.slice(0,200).map((a,i)=><AItem key={i} item={a} users={users}/>)}
      </div>
    </div>
  );
}

function AItem({item,compact=false,users}){
  const a=item.action;const sc=a==="status_change"?SC[item.to]:null;
  const I=sc?sc.ic:a==="visit"?UserCheck:a==="prazo_change"?CalendarDays:a==="responsavel_change"?UserPlus:a==="grupo_change"?ArrowRightLeft:a==="doc_added"?Plus:a==="doc_removed"?Trash2:a==="doc_reactivated"?RotateCcw:a?.startsWith("cancel")?Ban:a?.startsWith("user_")?Settings:MessageSquare;
  const ui=users?.[item.user];const col=sc?.tx||"#94A3B8";
  return(
    <div className={`flex items-start gap-3 ${compact?"p-2":"p-3"}`}>
      <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0"><I className="w-3.5 h-3.5" style={{color:col}}/></div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-slate-300">
          <span className="font-semibold text-white">{item.user}</span>
          {ui?.role==="gestor"&&<span className="ml-1.5 text-[9px] bg-purple-900/50 text-purple-300 px-1 py-0.5 rounded font-bold">GESTÃO</span>}
          {item.role==="visitante"&&<span className="ml-1.5 text-[9px] text-slate-500">visitante</span>}
          {a==="status_change"&&<> → <span style={{color:sc.tx}} className="font-semibold">{item.to}</span> em <span className="text-slate-200 font-medium">{item.docId}</span></>}
          {a==="comment"&&<> comentou em <span className="text-slate-200 font-medium">{item.docId}</span></>}
          {a==="visit"&&<> entrou no painel</>}
          {a==="prazo_change"&&<> {item.isFirstPrazo?"definiu":"alterou"} prazo de <span className="text-slate-200 font-medium">{item.docId}</span> → <span className="text-emerald-400 font-semibold">{fmtD(item.to)}</span>{item.reagendamentoAposVencido&&<span className="ml-1.5 text-[9px] bg-red-950/50 text-red-300 px-1 py-0.5 rounded">REAGENDADO</span>}</>}
          {a==="responsavel_change"&&<> definiu responsável em <span className="text-slate-200 font-medium">{item.docId}</span>: <span className="text-emerald-400">{item.to||"nenhum"}</span></>}
          {a==="grupo_change"&&<> transferiu <span className="text-slate-200 font-medium">{item.docId}</span>: <span className="text-amber-400">{item.from}</span> → <span className="text-emerald-400">{item.to}</span></>}
          {a==="cancel_request"&&<> pediu cancelamento de <span className="text-slate-200 font-medium">{item.docId}</span></>}
          {a==="cancel_approved"&&<> aprovou cancelamento de <span className="text-slate-200 font-medium">{item.docId}</span></>}
          {a==="cancel_rejected"&&<> rejeitou cancelamento de <span className="text-slate-200 font-medium">{item.docId}</span></>}
          {a==="doc_added"&&<> criou <span className="text-slate-200 font-medium">{item.docId}</span></>}
          {a==="doc_removed"&&<> excluiu <span className="text-slate-200 font-medium">{item.docId}</span></>}
          {a==="doc_reactivated"&&<> reativou <span className="text-slate-200 font-medium">{item.docId}</span></>}
          {a==="user_added"&&<> adicionou <span className="text-emerald-400 font-medium">{item.targetUser}</span> ({item.role})</>}
          {a==="user_updated"&&<> editou <span className="text-emerald-400 font-medium">{item.targetUser}</span>: {item.changes}</>}
          {a==="user_inactivated"&&<> inativou <span className="text-amber-400 font-medium">{item.targetUser}</span></>}
          {a==="user_reactivated"&&<> reativou <span className="text-emerald-400 font-medium">{item.targetUser}</span></>}
          {a==="user_removed"&&<> excluiu <span className="text-red-400 font-medium">{item.targetUser}</span></>}
        </div>
        {!compact&&item.docName&&<p className="text-[11px] text-slate-500 mt-0.5 truncate">{item.docName}</p>}
        {!compact&&a==="comment"&&item.text&&<p className="text-[11px] text-slate-400 mt-1 italic line-clamp-2">"{item.text}"</p>}
        {!compact&&a==="visit"&&item.email&&<p className="text-[11px] text-slate-500 mt-0.5">{item.email}</p>}
        {!compact&&(item.observacao||item.motivo)&&<p className="text-[11px] text-slate-400 mt-1 italic">"{item.observacao||item.motivo}"</p>}
      </div>
      <span className="text-[10px] text-slate-500 flex-shrink-0">{fmtT(item.ts)}</span>
    </div>
  );
}

// DESEMPENHO
function Desempenho({docs,history,users}){
  const perf=useMemo(()=>{
    return Object.entries(users).filter(([_,u])=>u.role==="integrante").map(([nome])=>{
      const meus=docs.filter(d=>d.responsavel===nome);
      const ativos=meus.filter(d=>d.status!=="Cancelado");
      const concl=ativos.filter(d=>d.status==="Concluído").length;
      const fora=ativos.filter(d=>(d.status==="Concluído"&&d.primeiroPrazo&&d.dataConclusao>d.primeiroPrazo)||(d.status!=="Concluído"&&d.prazo&&Date.now()>d.prazo)).length;
      const reagend=history.filter(h=>h.action==="prazo_change"&&h.reagendamentoAposVencido===true&&h.responsavelDoDoc===nome).length;
      const canc=meus.filter(d=>d.status==="Cancelado").length;
      return{nome,grupo:users[nome].grupo,total:ativos.length,concl,fora,reagend,canc};
    }).sort((a,b)=>b.concl-a.concl);
  },[docs,history,users]);

  const ch=perf.map(p=>({name:p.nome.split(" ")[0],"Concluídos":p.concl,"Fora do prazo":p.fora,"Reagendados":p.reagend,"Cancelados":p.canc}));

  return(
    <div className="space-y-4">
      <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><Award className="w-6 h-6 text-emerald-400"/>Desempenho Individual</h1><p className="text-sm text-slate-400">Por responsável</p></div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-emerald-400"/>Comparativo</h3>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={ch} margin={{top:10,right:10,left:0,bottom:60}}>
            <XAxis dataKey="name" stroke="#94A3B8" tick={{fontSize:10}} angle={-35} textAnchor="end" height={70}/>
            <YAxis stroke="#475569" tick={{fontSize:10}}/>
            <Tooltip contentStyle={{background:"#1E293B",border:"1px solid #334155",borderRadius:8,fontSize:12}}/>
            <Legend wrapperStyle={{fontSize:11}} iconType="circle"/>
            <Bar dataKey="Concluídos" fill="#10B981" radius={[2,2,0,0]}/>
            <Bar dataKey="Fora do prazo" fill="#EF4444" radius={[2,2,0,0]}/>
            <Bar dataKey="Reagendados" fill="#F59E0B" radius={[2,2,0,0]}/>
            <Bar dataKey="Cancelados" fill="#6B7280" radius={[2,2,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-4 py-2.5 bg-slate-800/50 border-b border-slate-800"><h2 className="text-sm font-bold text-emerald-400">Tabela detalhada</h2></div>
        <div className="overflow-x-auto"><table className="w-full text-xs">
          <thead><tr className="border-b border-slate-800 text-slate-400">
            {["Integrante","Grupo","Ativos","Concluídos","Fora do prazo","Reagendados","Cancelados","% Conclusão"].map(h=>(
              <th key={h} className="px-4 py-2.5 text-left font-semibold uppercase tracking-wider text-[10px]">{h}</th>
            ))}
          </tr></thead>
          <tbody className="divide-y divide-slate-800">
            {perf.map(p=>{const gc=GC[p.grupo]||GC["Doc. A"];const pct=p.total>0?Math.round(p.concl/p.total*100):0;return(
              <tr key={p.nome} className="hover:bg-slate-800/30">
                <td className="px-4 py-2.5 text-slate-200 font-medium">{p.nome}</td>
                <td className="px-4 py-2.5"><span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider" style={{background:gc.bg,color:gc.tx}}>{p.grupo}</span></td>
                <td className="px-4 py-2.5 text-center text-slate-300">{p.total}</td>
                <td className="px-4 py-2.5 text-center"><span className="text-emerald-400 font-bold">{p.concl}</span></td>
                <td className="px-4 py-2.5 text-center"><span className={p.fora>0?"text-red-400 font-bold":"text-slate-500"}>{p.fora}</span></td>
                <td className="px-4 py-2.5 text-center"><span className={p.reagend>0?"text-amber-400 font-bold":"text-slate-500"}>{p.reagend}</span></td>
                <td className="px-4 py-2.5 text-center"><span className={p.canc>0?"text-slate-300 font-bold":"text-slate-500"}>{p.canc}</span></td>
                <td className="px-4 py-2.5 text-center"><div className="flex items-center gap-2 justify-center">
                  <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 rounded-full" style={{width:`${pct}%`}}/></div>
                  <span className="text-slate-300 font-semibold w-8 text-right">{pct}%</span>
                </div></td>
              </tr>
            );})}
          </tbody>
        </table></div>
      </div>
    </div>
  );
}

// USUÁRIOS
function Usuarios({users,currentUser,onAdd,onEdit,onToggle,onRemove}){
  const[showAdd,setShowAdd]=useState(false);const[editN,setEditN]=useState(null);const[newU,setNewU]=useState(null);const[delN,setDelN]=useState(null);const[revPwd,setRevPwd]=useState({});
  const entries=Object.entries(users).sort((a,b)=>a[1].role!==b[1].role?a[1].role==="gestor"?-1:1:a[0].localeCompare(b[0]));
  const tP=n=>setRevPwd(r=>({...r,[n]:!r[n]}));
  const cpP=p=>{navigator.clipboard.writeText(p);};

  return(
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-2 flex-wrap">
        <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><Settings className="w-6 h-6 text-emerald-400"/>Usuários</h1><p className="text-sm text-slate-400">{entries.length} cadastrados</p></div>
        <button onClick={()=>setShowAdd(true)} className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg"><UserPlus2 className="w-4 h-4"/>Adicionar</button>
      </div>
      <div className="bg-amber-950/30 border border-amber-900/50 rounded-xl p-3 text-xs text-amber-300 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5"/><div><strong>Confidencial.</strong> Compartilhe senhas individualmente por canal privado.</div>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="divide-y divide-slate-800">
          {entries.map(([name,info])=>{const gc=GC[info.grupo]||GC["Doc. A"];const isCur=name===currentUser.name;return(
            <div key={name} className={`px-4 py-3 ${!info.ativo?"opacity-50":""}`}>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-white">{name}</span>
                    {info.role==="gestor"&&<span className="text-[9px] bg-purple-900/50 text-purple-300 px-1.5 py-0.5 rounded font-bold tracking-wider">GESTÃO</span>}
                    {!info.ativo&&<span className="text-[9px] bg-slate-700 text-slate-400 px-1.5 py-0.5 rounded font-bold tracking-wider">INATIVO</span>}
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider mt-1 inline-block" style={{background:gc.bg,color:gc.tx}}>{info.grupo}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="bg-slate-800 border border-slate-700 rounded px-3 py-1.5 font-mono text-xs min-w-[160px] text-center">
                    {revPwd[name]?<span className="text-emerald-300">{info.pwd}</span>:<span className="text-slate-600">••••••••••••</span>}
                  </div>
                  <button onClick={()=>tP(name)} className="p-2 bg-slate-800 hover:bg-slate-700 rounded text-slate-300">{revPwd[name]?<EyeOff className="w-3.5 h-3.5"/>:<Eye className="w-3.5 h-3.5"/>}</button>
                  {revPwd[name]&&<button onClick={()=>cpP(info.pwd)} className="p-2 bg-emerald-600 hover:bg-emerald-500 rounded text-white"><Copy className="w-3.5 h-3.5"/></button>}
                  <button onClick={()=>setEditN(name)} className="p-2 bg-slate-800 hover:bg-blue-900/40 hover:text-blue-300 rounded text-slate-300"><Edit3 className="w-3.5 h-3.5"/></button>
                  {!isCur&&<>
                    <button onClick={()=>onToggle(name)} className="p-2 bg-slate-800 hover:bg-amber-900/40 hover:text-amber-300 rounded text-slate-300">{info.ativo?<UserX className="w-3.5 h-3.5"/>:<UserCheck className="w-3.5 h-3.5"/>}</button>
                    <button onClick={()=>setDelN(name)} className="p-2 bg-slate-800 hover:bg-red-900/40 hover:text-red-300 rounded text-slate-300"><Trash2 className="w-3.5 h-3.5"/></button>
                  </>}
                </div>
              </div>
            </div>
          );})}
        </div>
      </div>

      {showAdd&&<AddUserModal onClose={()=>setShowAdd(false)} onAdd={d=>{const r=onAdd(d);if(r.ok){setNewU({name:d.name,pwd:r.pwd});setShowAdd(false);}return r;}}/>}
      {editN&&<EditUserModal name={editN} user={users[editN]} onClose={()=>setEditN(null)} onSave={d=>{const r=onEdit(editN,d);if(r.ok)setEditN(null);return r;}}/>}
      {newU&&<NewUserModal name={newU.name} pwd={newU.pwd} onClose={()=>setNewU(null)}/>}
      {delN&&<div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-red-800 rounded-2xl shadow-2xl p-6 w-full max-w-md">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-3"><Trash2 className="w-5 h-5 text-red-400"/>Excluir usuário</h2>
          <p className="text-sm text-slate-300 mb-3">Excluir <strong>{delN}</strong>? Documentos onde era responsável ficarão sem responsável.</p>
          <p className="text-[11px] text-amber-400 mb-4">💡 Prefira inativar para manter o histórico.</p>
          <div className="flex gap-2">
            <button onClick={()=>{onRemove(delN);setDelN(null);}} className="flex-1 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold py-2 rounded-lg">Excluir definitivamente</button>
            <button onClick={()=>setDelN(null)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold py-2 rounded-lg">Voltar</button>
          </div>
        </div>
      </div>}
    </div>
  );
}

function AddUserModal({onClose,onAdd}){
  const[d,setD]=useState({name:"",role:"integrante",grupo:"Doc. A"});const[err,setErr]=useState("");
  const go=()=>{if(!d.name.trim())return setErr("Nome obrigatório");const r=onAdd({...d,name:d.name.trim()});if(!r.ok)setErr(r.msg||"Erro");};
  return(
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-bold text-white flex items-center gap-2"><UserPlus2 className="w-5 h-5 text-emerald-400"/>Novo usuário</h2><button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5"/></button></div>
        <div className="space-y-3">
          <div><label className="block text-[10px] text-slate-400 mb-1 uppercase">Nome completo</label><input value={d.name} onChange={e=>setD({...d,name:e.target.value})} className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"/></div>
          <div><label className="block text-[10px] text-slate-400 mb-1 uppercase">Tipo</label>
            <select value={d.role} onChange={e=>setD({...d,role:e.target.value,grupo:e.target.value==="gestor"?"Gestão":d.grupo})} className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500">
              <option value="integrante">Integrante</option><option value="gestor">Gestão</option></select></div>
          {d.role==="integrante"&&<div><label className="block text-[10px] text-slate-400 mb-1 uppercase">Grupo</label>
            <select value={d.grupo} onChange={e=>setD({...d,grupo:e.target.value})} className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500">
              {["Eventos","Doc. A","Doc. B"].map(g=><option key={g}>{g}</option>)}</select></div>}
          <div className="bg-slate-800/50 border border-slate-800 rounded-lg p-3 text-[11px] text-slate-400">🔑 Senha gerada automaticamente e mostrada após criação.</div>
          {err&&<p className="text-red-400 text-xs">{err}</p>}
          <div className="flex gap-2 pt-2">
            <button onClick={go} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold py-2 rounded-lg">Adicionar</button>
            <button onClick={onClose} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold py-2 rounded-lg">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditUserModal({name,user,onClose,onSave}){
  const[d,setD]=useState({newName:name,role:user.role,grupo:user.grupo,pwd:""});const[err,setErr]=useState("");
  const go=()=>{
    if(!d.newName.trim())return setErr("Nome obrigatório");
    const p={};const nn=d.newName.trim();
    if(nn!==name)p.newName=nn;if(d.role!==user.role)p.role=d.role;if(d.grupo!==user.grupo)p.grupo=d.grupo;if(d.pwd.trim())p.pwd=d.pwd.trim();
    if(!Object.keys(p).length){onClose();return;}
    const r=onSave(p);if(!r.ok)setErr(r.msg||"Erro");
  };
  return(
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-bold text-white flex items-center gap-2"><Edit3 className="w-5 h-5 text-blue-400"/>Editar usuário</h2><button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5"/></button></div>
        <div className="space-y-3">
          <div><label className="block text-[10px] text-slate-400 mb-1 uppercase">Nome</label><input value={d.newName} onChange={e=>setD({...d,newName:e.target.value})} className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"/></div>
          <div><label className="block text-[10px] text-slate-400 mb-1 uppercase">Tipo</label>
            <select value={d.role} onChange={e=>setD({...d,role:e.target.value,grupo:e.target.value==="gestor"?"Gestão":d.grupo})} className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500">
              <option value="integrante">Integrante</option><option value="gestor">Gestão</option></select></div>
          {d.role==="integrante"&&<div><label className="block text-[10px] text-slate-400 mb-1 uppercase">Grupo</label>
            <select value={d.grupo} onChange={e=>setD({...d,grupo:e.target.value})} className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500">
              {["Eventos","Doc. A","Doc. B"].map(g=><option key={g}>{g}</option>)}</select></div>}
          <div><label className="block text-[10px] text-slate-400 mb-1 uppercase">Nova senha (em branco = manter)</label><input type="text" value={d.pwd} onChange={e=>setD({...d,pwd:e.target.value})} placeholder="Deixe em branco para manter" className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"/></div>
          {err&&<p className="text-red-400 text-xs">{err}</p>}
          <div className="flex gap-2 pt-2">
            <button onClick={go} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-2 rounded-lg">Salvar</button>
            <button onClick={onClose} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold py-2 rounded-lg">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewUserModal({name,pwd,onClose}){
  const[cp,setCp]=useState(false);const copy=()=>{navigator.clipboard.writeText(pwd);setCp(true);setTimeout(()=>setCp(false),1500);};
  return(
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-emerald-700 rounded-2xl shadow-2xl p-6 w-full max-w-md">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-3"><CheckCircle2 className="w-5 h-5 text-emerald-400"/>Usuário criado!</h2>
        <p className="text-sm text-slate-300 mb-4"><strong className="text-emerald-400">{name}</strong> adicionado. Senha gerada:</p>
        <div className="bg-slate-800 border border-emerald-800 rounded-lg p-4 mb-4">
          <div className="text-[10px] text-slate-400 uppercase mb-1">Senha</div>
          <div className="flex items-center justify-between gap-2"><span className="font-mono text-lg text-emerald-300">{pwd}</span>
            <button onClick={copy} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded flex items-center gap-1.5"><Copy className="w-3.5 h-3.5"/>{cp?"Copiado!":"Copiar"}</button>
          </div>
        </div>
        <p className="text-[11px] text-amber-400 mb-4">⚠ Guarde esta senha. Você pode consultá-la na aba "Usuários".</p>
        <button onClick={onClose} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold py-2 rounded-lg">Entendi</button>
      </div>
    </div>
  );
}

// EXPORTAR
function Export({state}){
  const{docs,comments,history}=state;
  const expCSV=()=>{
    const rows=[["ID","Documento","Categoria","Grupo","Dificuldade","Responsável","Status","1º Prazo","Prazo Atual","Conclusão","Atrasado","Cancelado","Comentários"]];
    docs.forEach(d=>rows.push([d.id,d.doc,d.cat,d.grupo,d.dif,d.responsavel||"",d.status,fmtD(d.primeiroPrazo),fmtD(d.prazo),fmtDT(d.dataConclusao),isAtrasado(d)?"Sim":"Não",d.status==="Cancelado"?"Sim":"Não",(comments[d.id]||[]).length]));
    const csv=rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(",")).join("\n");
    const url=URL.createObjectURL(new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8"}));
    const a=document.createElement("a");a.href=url;a.download=`relatorio_${new Date().toISOString().slice(0,10)}.csv`;a.click();
  };
  const expHTML=()=>{
    const ativos=docs.filter(d=>d.status!=="Cancelado");const concl=ativos.filter(d=>d.status==="Concluído").length;const atras=docs.filter(d=>isAtrasado(d)).length;
    const html=`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Relatório 2026</title><style>body{font-family:Arial;padding:30px}h1{color:#006B3F}table{border-collapse:collapse;width:100%;font-size:11px;margin-top:15px}th{background:#006B3F;color:#fff;padding:8px;text-align:left}td{padding:6px 8px;border:1px solid #ccc}.atras{color:#991B1B;font-weight:bold}.canc{color:#6B7280;text-decoration:line-through}</style></head><body>
<h1>Relatório — Projeto Extensão 2026</h1><p>IFSP Piracicaba · ${new Date().toLocaleString('pt-BR')}</p>
<div style="background:#F0F9F4;padding:15px;border-radius:8px;margin:15px 0"><strong>Progresso:</strong> ${Math.round(concl/(ativos.length||1)*100)}% (${concl}/${ativos.length}) · <strong>Atrasados:</strong> ${atras} · <strong>Cancelados:</strong> ${docs.length-ativos.length}</div>
<table><thead><tr><th>ID</th><th>Documento</th><th>Grupo</th><th>Responsável</th><th>Status</th><th>1º Prazo</th><th>Prazo</th><th>Conclusão</th></tr></thead><tbody>
${docs.map(d=>`<tr class="${d.status==="Cancelado"?"canc":""}"><td>${d.id}</td><td>${d.doc}</td><td>${d.grupo}</td><td>${d.responsavel||""}</td><td>${d.status}${isAtrasado(d)?` <span class="atras">(ATRASADO)</span>`:""}</td><td>${fmtD(d.primeiroPrazo)}</td><td>${fmtD(d.prazo)}</td><td>${fmtDT(d.dataConclusao)}</td></tr>`).join("")}
</tbody></table></body></html>`;
    const url=URL.createObjectURL(new Blob([html],{type:"text/html"}));
    const a=document.createElement("a");a.href=url;a.download=`relatorio_${new Date().toISOString().slice(0,10)}.html`;a.click();
  };
  return(
    <div className="space-y-5">
      <div><h1 className="text-2xl font-bold text-white">Exportar</h1><p className="text-sm text-slate-400">Apenas para Gestores</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button onClick={expCSV} className="bg-slate-900 border border-slate-800 hover:border-emerald-600 rounded-xl p-6 text-left"><FileSpreadsheet className="w-8 h-8 text-emerald-400 mb-3"/><div className="text-base font-bold text-white mb-1">Excel (.csv)</div><p className="text-xs text-slate-400">Com prazos, responsáveis, atrasos e cancelamentos.</p></button>
        <button onClick={expHTML} className="bg-slate-900 border border-slate-800 hover:border-emerald-600 rounded-xl p-6 text-left"><FileText className="w-8 h-8 text-emerald-400 mb-3"/><div className="text-base font-bold text-white mb-1">PDF (via HTML)</div><p className="text-xs text-slate-400">Abra no navegador e use "Salvar como PDF".</p></button>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-slate-200 mb-4">Snapshot</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[["Documentos",docs.length,"text-white"],["Concluídos",docs.filter(d=>d.status==="Concluído").length,"text-emerald-400"],["Atrasados",docs.filter(d=>isAtrasado(d)).length,"text-red-400"],["Cancelados",docs.filter(d=>d.status==="Cancelado").length,"text-slate-400"]].map(([l,v,cl])=>(
            <div key={l} className="bg-slate-800/50 rounded-lg p-3"><div className="text-xs text-slate-400">{l}</div><div className={`text-xl font-bold ${cl}`}>{v}</div></div>
          ))}
        </div>
      </div>
    </div>
  );
}
