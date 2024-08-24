function sequenciaFibonacci(termo) {
    
    let a =0;
    let b=1;
    let s = 0;
    let resp = "0,1,";
    for (let i = 0; i < termo-2; i++) {
        s = a + b;
        a = b;
        b= s;
        resp+=s+',';                
    }
    resp = resp.substring(0,resp.length-1);
    return resp;
}

console.log(sequenciaFibonacci(7));