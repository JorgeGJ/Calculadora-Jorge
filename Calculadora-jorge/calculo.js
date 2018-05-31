{
	var calculadora = {
		acumulado: '0',
		operador:"",
		operador2: false,
		valorAcumulado: '',
		//operaciones
		sumar: (n1, n2)=> {
			return n1 + n2;
		},
		restar:(n1, n2) => {
			return n1 - n2;
		},
		multi: (n1, n2) => {
			return n1 * n2;
		},
		dividir: (n1, n2) => {
			return n1 / n2;
		},
		//operacion
		operacion: (resultado) => {
			switch (calculadora.valorAcumulado){
				case '/':
					return calculadora.dividir(parseFloat(calculadora.acumulado), parseFloat( calculadora.pantalla.value));
					break;
				case '+':
					return calculadora.sumar(parseFloat(calculadora.acumulado), parseFloat( calculadora.pantalla.value));
					break;
				case '-':
					return calculadora.restar(parseFloat(calculadora.acumulado), parseFloat( calculadora.pantalla.value));
					break;
				case '*':
					return calculadora.multi(parseFloat(calculadora.acumulado), parseFloat( calculadora.pantalla.value));
					break;
			}
		},
		pulsar: function(e){
			let valor=e.target.value;
			switch(valor){
				case 'ce':
					calculadora.pantalla.value = calculadora.acumulado = 0;
					calculadora.operador = "";
					calculadora.valorAcumulado = '';
					break;
				case '<-':
					if (calculadora.pantalla.value>0){
			          if (calculadora.pantalla.value.length>=2) calculadora.pantalla.value=calculadora.pantalla.value.substr(0, calculadora.pantalla.value.length-1);
			          else calculadora.pantalla.value=0;
			        }else{
			          if (calculadora.pantalla.value.length>2) calculadora.pantalla.value=calculadora.pantalla.value.substr(0, calculadora.pantalla.value.length-1);
			          else calculadora.pantalla.value=0;
			        }
					break;
				case '%':
					if (calculadora.pantalla.value != '')
                        calculadora.pantalla.value = parseFloat(calculadora.pantalla.value) / 100;
					break;
				case '+':
				case '-':
				case '*':
				case '/':
					calculadora.operador2 = true;
					if (calculadora.pantalla.value !== '') {
					if (calculadora.valorAcumulado !== '') {
						calculadora.acumulado = calculadora.operacion(calculadora.pantalla);
						calculadora.valorAcumulado = valor;
						calculadora.pantalla.value = calculadora.acumulado;
					}else{
						calculadora.acumulado = parseFloat(calculadora.pantalla.value);
						calculadora.valorAcumulado = valor;
						calculadora.pantalla.value = calculadora.acumulado;
					}
				}
					break;
				case '=':
				if(calculadora.pantalla.value=='%'){
					calculadora.pantalla.value=parseFloat(calculadora.acumulado)%parseFloat(calculadora.pantalla.value);
				}
				if (calculadora.valorAcumulado !== '' && calculadora.pantalla.value.length > 0) {
					calculadora.acumulado = calculadora.operacion(calculadora.pantalla.value);
					calculadora.pantalla.value = calculadora.acumulado;
					calculadora.valorAcumulado = '=';
				}else{
					calculadora.valorAcumulado = '';
					calculadora.pantalla.value = calculadora.acumulado;
				}
					break;
				case '+-':
					if (calculadora.pantalla.value != '' && calculadora.pantalla.value != 0) {
						let numero = calculadora.pantalla.value.slice(0, 1);
						if(numero =='-')
							calculadora.pantalla.value = calculadora.pantalla.value.replace('-','');
						else
							calculadora.pantalla.value= '-' + calculadora.pantalla.value;
					} 
					break;
				case '.':
					 if (calculadora.pantalla.value != '' && calculadora.pantalla.value.match(/\./g) != '.') { 
                        calculadora.pantalla.value +=  '.';
                    }
					break;
				default:
					if (calculadora.pantalla.value==='0' || calculadora.operador2===true){
						calculadora.pantalla.value=valor;
						calculadora.operador2= false;
					}
					else {
						calculadora.pantalla.value+=valor;
					}
					break;
			}
		},
		diseno: function(){
			let botones =["ce","<-","%","+",7,8,9,"-",4,5,6,"*",1,2,3,"/",0,"+-",".","="];
			let caja = document.createElement('div');
			caja.style.width="300px";
			caja.style.height="400px";
			caja.style.backgroundColor="#00FFFF";
			caja.style.textAlign = "center";
			document.body.appendChild(caja);
			let pantalla = document.createElement('input');
			pantalla.setAttribute('readonly','readonly');
			pantalla.setAttribute('value',calculadora.acumulado);
			pantalla.style.width="95%";
			pantalla.style.height="17%";
			pantalla.style.marginTop="10px";
			pantalla.style.textAlign='right';
			caja.appendChild(pantalla);
			for(let i =0; i < botones.length; i++){
				let boton = document.createElement('input');
				boton.value=botones[i];
				boton.type="button";
				boton.style.width="60px";
				boton.style.height="50px";
				boton.style.margin="5px";
				boton.addEventListener('click', calculadora.pulsar);
				caja.appendChild(boton);
			}
			calculadora.pantalla=pantalla;
		},
		pantalla:"",
	}
	document.body.onload=calculadora.diseno;
}