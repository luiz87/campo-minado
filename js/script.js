    // codigo da tabela
    var tabela = "<table>";
    var i, j;
	var tb = [];
	var dificuldade = 50;
	var tamanho = 20;
	var jogando = true;
	var msg = document.getElementById("msg");
	//desafio do jogo descobrir os lugares que não tem bomba!
	//qual a quantidade de lugares que não tem bomba?
	var desafio = (tamanho * tamanho) - dificuldade;
    for(i = 1; i <= tamanho; i++){
		tb[i] = [];
        tabela += "<tr>";
        for(j = 1; j <= tamanho; j++){		
        tabela += "<td id='cel-"+i+"-"+j+
        "'onclick='clique("+i+","+j+")' "+
		" oncontextmenu='mudarCor(this)' ></td>";
        }
        tabela += "</tr>";
    }
    tabela += "</table>";
    document.write(tabela);
    
    // marcar as bombas.
    for(var b = 1; b <= dificuldade; b++){ 
        i = Math.floor(Math.random() * tamanho)+1;
        j = Math.floor(Math.random() * tamanho)+1;
		if(tb[i][j] == -1){
			b--;
		}else{		
			tb[i][j] = -1;
		}
    }
    msg.innerHTML = desafio;
	
    function clique(i , j){
	if(jogando){
		if(typeof tb[i][j] == "undefined"){
			desafio--;
			msg.innerHTML = desafio;
		}
		
		// ganhou o jogo
		if(desafio == 0){
			jogando = false;
			msg.innerHTML = "É Campeão";
			msg.style.color = "blue";			
			marcarCorBombas("blue");
		}
		// teste se acertou alguma bomba
		if( tb[i][j] == -1){
			jogando = false;
			msg.innerHTML = "Perdeu";
			msg.style.color = "red";
			marcarCorBombas("red");
		}		
		else{
			var qtBomba = contarBombas(i,j,0);
			tb[i][j] = qtBomba;
			if(qtBomba > 0){
			document.getElementById(
			"cel-"+i+"-"+j).innerHTML  = qtBomba;
			} else{
				contarBombas(i,j,1);
			}
			
			document.getElementById("cel-"+i+
			"-"+j).style.background = "#c1c1c1";		
		}
		
	}  
    }
    
    
	function contarBombas(i,j,clicar){
		var xi, xj, quantidade;
		quantidade = 0;
		for(xi = i-1; xi <= i+1; xi++){
			for(xj = j-1; xj <= j+1; xj++){
				try{
					if(tb[xi][xj] == -1){
					quantidade++;
					}
					//condições para fazer novos cliques
					if(typeof tb[xi][xj] == "undefined" &&
					clicar == 1 &&
					!(xi == i && xj == j) &&
					xi >= 1 && xi <= tamanho &&
					xj >= 1 && xj <= tamanho
					){
						clique(xi,xj);
					}
				}catch(err){
					console.log('erro array');
				}
			}
		}
		return quantidade;
	}

	
	function desligar(){
		return false;
	}
	document.oncontextmenu = desligar;
	
	function mudarCor(obj){
		if(jogando){
		if(obj.style.background == 'blue'){
			obj.style.background = 'gray';
			return '';
		}
		obj.style.background = 'blue';
		}
	}
	
	function marcarCorBombas(cor){
			for(i =1 ; i <= tamanho; i++){
			for(j=1; j<=tamanho; j++){
				if(tb[i][j] == -1){
				document.getElementById(
				"cel-"+i+"-"+j).style.background = cor;
				}
			}
		}
	}