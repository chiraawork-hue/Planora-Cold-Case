/* v92: local ink layer for every opened evidence modal (documents, raw tables, photos) */
(function(){
 const PREFIX='cc_ink_v92_';let current=null;
 function keyFor(title){return PREFIX+encodeURIComponent(title)}
 function load(k){try{return JSON.parse(localStorage.getItem(k)||'[]')}catch(e){return []}}
 function save(k,data){try{localStorage.setItem(k,JSON.stringify(data))}catch(e){}}
 function eligible(title,body){
 return !!body.querySelector('.modalcontent') && (
  !!body.querySelector('.letterhead,.photohero,.bap-sheet,.data-table,table,.reportpage,.sheet,.document-page')
  || /\.(pdf|csv|log|txt|jpg|png)$/i.test(title)
  || /^(TKP_|VX17_|DEVICE_01_CHAT|SEC_|STRUCTURAL_|IT_)/i.test(title)
 );
 }
 function attach(title){
  const body=document.getElementById('modalBody'),paper=body&&body.querySelector('.modalcontent');
  if(!paper||!eligible(title,body)||document.querySelector('.modalwindow > .ink-tools'))return;
  const key=keyFor(title);const strokes=load(key);
  paper.classList.add('ink-paper');
  const bar=document.createElement('div');bar.className='ink-tools';
  bar.innerHTML='<span class="ink-title">✎ ANOTASI BERKAS</span><button type="button" data-tool="pen">Pena</button><button type="button" data-tool="highlight">Stabilo</button><button type="button" data-tool="erase">Hapus garis</button><button type="button" data-tool="off">Selesai</button><span class="ink-status">Pilih alat untuk mencoret</span>';
  const modalWindow=document.querySelector('.modalwindow');
  if(!modalWindow)return;
  modalWindow.insertBefore(bar,body);
  const canvas=document.createElement('canvas');canvas.className='ink-layer';paper.appendChild(canvas);
  let tool='off',active=null,ctx=null,w=1,h=1;
  const redraw=()=>{
    w=Math.max(1,paper.clientWidth);h=Math.max(1,paper.scrollHeight);
    const ratio=Math.min(window.devicePixelRatio||1,2);
    canvas.style.width=w+'px';canvas.style.height=h+'px';canvas.width=Math.round(w*ratio);canvas.height=Math.round(h*ratio);
    ctx=canvas.getContext('2d');ctx.setTransform(ratio,0,0,ratio,0,0);
    for(const line of strokes){if(!line.points||!line.points.length)continue;
      ctx.beginPath();ctx.lineJoin='round';ctx.lineCap='round';ctx.strokeStyle=line.tool==='highlight'?'rgba(246,210,54,0.34)':'#b92f43';ctx.lineWidth=line.tool==='highlight'?19:2.6;
      line.points.forEach((p,i)=>i?ctx.lineTo(p[0]*w,p[1]*h):ctx.moveTo(p[0]*w,p[1]*h));
      if(line.points.length===1){let p=line.points[0];ctx.lineTo(p[0]*w+.1,p[1]*h+.1)}ctx.stroke();
    }
  };
  function choose(next){tool=next;canvas.style.pointerEvents=tool==='pen'||tool==='highlight'?'auto':'none';canvas.style.touchAction=tool==='off'?'auto':'none';bar.querySelectorAll('button[data-tool]').forEach(b=>b.classList.toggle('ink-selected',b.dataset.tool===tool));bar.querySelector('.ink-status').textContent=tool==='off'?'Mode baca':tool==='erase'?'Garis terakhir dihapus':tool==='highlight'?'Stabilo aktif':'Pena aktif'}
  bar.addEventListener('click',e=>{const b=e.target.closest('button[data-tool]');if(!b)return;const t=b.dataset.tool;if(t==='erase'){strokes.pop();save(key,strokes);redraw();choose('erase')}else choose(t)});
  const point=e=>{const r=canvas.getBoundingClientRect();return [Math.max(0,Math.min(1,(e.clientX-r.left)/w)),Math.max(0,Math.min(1,(e.clientY-r.top)/h))]};
  canvas.addEventListener('pointerdown',e=>{if(tool!=='pen'&&tool!=='highlight')return;e.preventDefault();active={tool,points:[point(e)]};canvas.setPointerCapture(e.pointerId)});
  canvas.addEventListener('pointermove',e=>{if(!active)return;active.points.push(point(e));redraw();const line=active;ctx.beginPath();ctx.strokeStyle=line.tool==='highlight'?'rgba(246,210,54,0.34)':'#b92f43';ctx.lineWidth=line.tool==='highlight'?19:2.6;ctx.lineJoin='round';ctx.lineCap='round';line.points.forEach((p,i)=>i?ctx.lineTo(p[0]*w,p[1]*h):ctx.moveTo(p[0]*w,p[1]*h));ctx.stroke()});
  function end(){if(!active)return;strokes.push(active);active=null;save(key,strokes);redraw()}
  canvas.addEventListener('pointerup',end);canvas.addEventListener('pointercancel',end);
  choose('off');requestAnimationFrame(redraw);
  const observer=new ResizeObserver(()=>{if(!active)redraw()});observer.observe(paper);
  current={observer,canvas,bar};
 }
 function refresh(){if(current){current.observer.disconnect();current.bar?.remove();current=null}const title=window.modalCurrent&&window.modalCurrent.title||document.getElementById('modalPath')?.textContent?.split('\\').pop()||'';requestAnimationFrame(()=>attach(title))}
 const oldShow=window.show;window.show=function(){const result=oldShow.apply(this,arguments);refresh();return result};
 const oldBack=window.backModal;window.backModal=function(){const result=oldBack.apply(this,arguments);refresh();return result};
 const oldClose=window.closeModal;window.closeModal=function(){if(current){current.observer.disconnect();current=null}return oldClose.apply(this,arguments)};
})();
