(function(){
  function draw(ctx,data){
    const {labels,series,colors}=data;const W=ctx.canvas.width,H=ctx.canvas.height;
    ctx.clearRect(0,0,W,H);const vals=series[0];const max=Math.max(...vals)*1.2;
    const m=20,bw=(W-2*m)/vals.length*0.6,gap=(W-2*m)/vals.length*0.4;
    vals.forEach((v,i)=>{const x=m+i*(bw+gap);const h=(v/max)*(H-2*m);
      ctx.fillStyle=colors[i%colors.length];ctx.fillRect(x,H-m-h,bw,h);
      ctx.fillStyle='#94a3b8';ctx.fillRect(x,H-m,bw,1);});
  }
  window.tinyBarChart=(ctx,data)=>(draw(ctx,data),{destroy(){},update(){draw(ctx,data);}});
})();