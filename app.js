'use strict';
// All benchmark values below are transcribed from Table 1 of the supplied PDF.
// The archive's YAML refers to an older result table and is intentionally not used.
const rows = [
['ovo_bw','Gemma 4 E2B',43.22,41.20,42.30,45.31,43.83],
['ovo_rt','Gemma 4 E2B',50.72,48.02,47.23,55.49,57.70],
['ovo_bw','Gemma 4 E4B',53.86,53.01,50.49,54.45,54.45],
['ovo_rt','Gemma 4 E4B',59.83,51.67,53.26,62.51,64.81],
['ovo_bw','NEO-ov 2B',38.66,35.22,null,39.09,41.90],
['ovo_rt','NEO-ov 2B',58.07,36.84,null,44.41,62.78],
['sb','Gemma 4 E2B',51.28,52.91,51.36,58.01,61.29],
['sb','Gemma 4 E4B',63.73,56.44,60.25,63.61,66.49],
['sb','NEO-ov 2B',69.06,50.68,null,55.56,69.10],
['lvb','Gemma 4 E2B',35.90,33.06,34.64,34.11,35.60],
['lvb','Gemma 4 E4B',49.14,43.38,43.98,43.08,45.77],
['lvb','NEO-ov 2B',52.51,44.43,null,42.93,49.29],
['mme','Gemma 4 E2B',18.47,14.16,15.69,15.31,15.41],
['mme','Gemma 4 E4B',20.09,14.34,15.91,14.84,17.63],
['mme','NEO-ov 2B',22.06,17.56,null,17.47,20.03]
];
const labels={ovo_bw:'OVO-Bench / Backward',ovo_rt:'OVO-Bench / Realtime',sb:'StreamingBench / Realtime',lvb:'LongVideoBench / Validation',mme:'Video-MME-v2 / Overall'};
const names=['Vanilla','STC-Pruner','STOM-CTR','CausalMem','KeyRec'];
const $=s=>document.querySelector(s);
function updateResults(){
 const r=rows.find(r=>r[0]===$('#benchmark').value&&r[1]===$('#model').value), values=r.slice(2);
 $('#bars').innerHTML=values.map((v,i)=>`<div class="bar-row ${i===0?'vanilla':i===4?'keyrec':''}"><div class="bar-name">${names[i]}</div><div class="bar-track"><div class="bar-fill" style="width:${v??0}%"></div></div><span class="bar-value">${v===null?'—':v.toFixed(2)}</span></div>`).join('');
 $('#bars').setAttribute('aria-label',`${r[1]}, ${labels[r[0]]}. Accuracy, zero-to-100 scale. `+values.map((v,i)=>`${names[i]}: ${v??'unsupported'}`).join('; '));
 const diff=values[4]-Math.max(...values.slice(1,4).filter(v=>v!==null));
 $('#result-insight').innerHTML=diff>0?`<strong>+${diff.toFixed(2)} points</strong> over the strongest compressed baseline in this setting.`:diff===0?'<strong>Tied best compressed result</strong> in this setting.':`KeyRec is <strong>${Math.abs(diff).toFixed(2)} points below</strong> the strongest compressed baseline in this setting.`;
}
$('#model').addEventListener('change',updateResults);$('#benchmark').addEventListener('change',updateResults);updateResults();
$('#all-results').innerHTML=rows.map(r=>{const best=Math.max(...r.slice(3).filter(v=>v!==null));return `<tr><td>${labels[r[0]]}</td><td>${r[1]}</td>${r.slice(2).map((v,i)=>`<td>${v===null?'—':i>0&&v===best?`<strong>${v.toFixed(2)}</strong>`:v.toFixed(2)}</td>`).join('')}</tr>`}).join('');
// Table 11: streaming allocations, in complete 16-token events.
const allocations=[0,2,4,12,14];
const details=['No historical events are retrieved. All 224 tokens come from the recent cache.','2 historical events are retrieved by query relevance; 192 recent tokens complete the readout.','4 historical events are retrieved by query relevance; 160 recent tokens complete the readout.','12 historical events are selected for temporal coverage; 32 recent tokens complete the readout.','14 historical events are selected for temporal coverage. No recent-cache tokens are included.'];
$('#budget-grid').innerHTML=Array.from({length:14},()=>`<div class="budget-block" aria-hidden="true">${'<i></i>'.repeat(16)}</div>`).join('');
function updateAllocation(){const index=Number($('#router').value),n=allocations[index];document.querySelectorAll('.budget-block').forEach((el,i)=>el.classList.toggle('event',i<n));$('#recent-count').textContent=224-n*16;$('#event-count').textContent=n*16;$('#allocation-detail').textContent=details[index];$('#budget-grid').setAttribute('aria-label',`${n*16} event tokens and ${224-n*16} recent tokens; 224 total`)}
let timer=null;
function stopTour(){clearInterval(timer);timer=null;$('#animate').textContent='▶ Play allocation tour'}
$('#router').addEventListener('change',()=>{stopTour();updateAllocation()});
$('#animate').addEventListener('click',()=>{if(timer){stopTour();return}$('#animate').textContent='Ⅱ Pause allocation tour';timer=setInterval(()=>{$('#router').value=String((Number($('#router').value)+1)%5);updateAllocation()},2200)});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopTour()});updateAllocation();

// Copy exactly the visible, user-supplied BibTeX. Selection remains available
// when clipboard access is unavailable (for example in some local-file views).
async function copyCitation(){
  const code = document.getElementById('bibtex');
  const status = document.getElementById('copy-status');
  try {
    if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(code.textContent);
    status.textContent = 'BibTeX copied to clipboard.';
  } catch (_) {
    const selection = window.getSelection();
    if (selection) {
      const range = document.createRange();
      range.selectNodeContents(code);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    status.textContent = 'Select the BibTeX and press Ctrl+C (Windows) or ⌘C (Mac) to copy.';
  }
}
document.getElementById('copy-citation').addEventListener('click', copyCitation);
