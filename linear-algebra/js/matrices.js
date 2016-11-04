// Autor Raúl Vázquez
// Idea original Raúl Díaz para sistema de educación a distancia
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/*
Función para pintar matrices
matriz es un arreglo bidimencional del tipo [[a,b],[c,d]]
dif es un arreglo de coordenadas del tipo ["1,1"] donde se pintara de color rojo
regresa una cadena en formato tex de la matriz
*/
function pintaMatriz(matriz, dif){		
	var htmlString=" \\left(\\begin{matrix}";
	for (var i = 0; i < matriz.length; i++) {			
		for (var j = 0; j < matriz[i].length; j++) {				

			if(!($.inArray(""+i+","+j,dif)==-1)) {
				htmlString += "  \\color{red}{ "
			}
			if(isNumber(matriz[i][j])){				
				htmlString += (Math.round(matriz[i][j]*100)/100);
			}
			else{
				htmlString += matriz[i][j];
			}

			if(!($.inArray(""+i+","+j,dif)==-1)) {
				htmlString += "  } "	
			}
			if(j < matriz[i].length -1){
				htmlString += " & "
			}
		}
		if(i < matriz.length -1){
			htmlString += "\\\\";
		}
	}
	htmlString += "\\end{matrix}\\right)";
	return htmlString;
}

/*
Función para pintar matrices con diagonal de distinto color
matriz es un arreglo bidimencional del tipo [[a,b],[c,d]]
regresa una cadena en formato tex de la matriz
*/
function pintaMatrizDiagonal(matriz){		
	var htmlString=" \\left(\\begin{matrix}";
	for (var i = 0; i < matriz.length; i++) {			
		for (var j = 0; j < matriz[i].length; j++) {				

			if( i == j ) {
				htmlString += "  \\color{red}{ "
			}
			if(isNumber(matriz[i][j])){				
				htmlString += (Math.round(matriz[i][j]*100)/100);
			}
			else{
				htmlString += matriz[i][j];
			}

			if( i == j ) {
				htmlString += "  } "	
			}
			if(j < matriz[i].length -1){
				htmlString += " & "
			}
		}
		if(i < matriz.length -1){
			htmlString += "\\\\";
		}
	}
	htmlString += "\\end{matrix}\\right)";
	return htmlString;
}

function resuelveSumaDiagonal(matriz){
	var htmlString = "tr\\(";
	htmlString += pintaMatriz(matriz,[]);
	htmlString += "="
	htmlString += "\\)"
	htmlString += "tr\\(";
	htmlString += pintaMatrizDiagonal(matriz);
	htmlString += "="
	htmlString += "  \\color{red}{ "
	for (var i = 0; i < matriz.length; i++) {
		htmlString += "("+matriz[i][i]+")";
		if(i < matriz.length -1){
			htmlString += "+";
		}
	};
	var res = 0;
	for (var i = 0; i < matriz.length; i++) {
		res += parseFloat(matriz[i][i]);		
	};
	htmlString += "=" + res;
	htmlString += "  } "
	htmlString += "\\)"
	return htmlString;

}

/*
Función para pintar determinantes
matriz es un arreglo bidimencional del tipo [[a,b],[c,d]]
dif es un arreglo de coordenadas del tipo ["1,1"] donde se pintara de color rojo
regresa una cadena en formato tex de la matriz
*/
function pintaDeterminante(matriz, dif){		
	var htmlString=" \\left|\\begin{matrix}";
	for (var i = 0; i < matriz.length; i++) {			
		for (var j = 0; j < matriz[i].length; j++) {				

			if(!($.inArray(""+i+","+j,dif)==-1)) {
				htmlString += "  \\color{red}{ "
			}
			htmlString += matriz[i][j];
			if(!($.inArray(""+i+","+j,dif)==-1)) {
				htmlString += "  } "	
			}
			if(j < matriz[i].length -1){
				htmlString += " & "
			}
		}
		if(i < matriz.length -1){
			htmlString += "\\\\";
		}
	}
	htmlString += "\\end{matrix}\\right|";
	return htmlString;
}

/* Función para resolver sumas
	recibe las matrices que se sumaran
	regresa la resolución de las matrices en formato TeX
*/
function resuelveSuma(matriz1, matriz2){
	var matrizResultado = new Array();
	for (var i = 0; i < matriz1.length; i++) {
		var tempArr = new Array();
		for (var j = 0; j < matriz1[i].length; j++) {
			tempArr[j] = "  . "
		};

		matrizResultado[i] = tempArr;
	};

	var htmlString = "\\("	
	htmlString += pintaMatriz(matriz1,[]);
	htmlString += "+";
	htmlString += pintaMatriz(matriz2,[]);
	htmlString += "=";
	htmlString += pintaMatriz(matrizResultado,[]);
	htmlString += 	 "\\) \<br /\>\<br /\>";

	for (var i = 0; i < matriz1.length; i++) {
		for (var j = 0; j < matriz1[i].length; j++) {
			htmlString += "\\(";
			htmlString += pintaMatriz(matriz1,[""+i+","+j]);
			htmlString += "+";
			htmlString += pintaMatriz(matriz2,[""+i+","+j]);
			htmlString += "=";
			matrizResultado[i][j] = ""+ (matriz1[i][j] >= 0 ? matriz1[i][j] : ("("+matriz1[i][j]+")")) + "+" + (matriz2[i][j] >= 0 ? matriz2[i][j] :"("+matriz2[i][j]+")");
			htmlString += pintaMatriz(matrizResultado,[""+i+","+j]);
			htmlString += 	 "\\) \<br /\>\<br /\>";
		};
	};
	for (var i = 0; i < matriz1.length; i++) {
		for (var j = 0; j < matriz1[i].length; j++) {
			matrizResultado[i][j] = parseFloat(matriz1[i][j]) + parseFloat(matriz2[i][j]);		
		};
	};
	htmlString += "\\("
	htmlString += pintaMatriz(matriz1,[]);
	htmlString += "+";
	htmlString += pintaMatriz(matriz2,[]);
	htmlString += "=";
	htmlString += pintaMatriz(matrizResultado,[]);
	htmlString += 	 "\\) \<br /\>\<br /\>";	

	return htmlString;
}
/* Función para resolver restas
	recibe las matrices que se restaran
	regresa la resolución de las matrices en formato TeX
*/
function resuelveResta(matriz1, matriz2){
	var matrizResultado = new Array();
	for (var i = 0; i < matriz1.length; i++) {
		var tempArr = new Array();
		for (var j = 0; j < matriz1[i].length; j++) {
			tempArr[j] = "  . "
		};

		matrizResultado[i] = tempArr;
	};

	var htmlString = "\\("	
	htmlString += pintaMatriz(matriz1,[]);
	htmlString += "-";
	htmlString += pintaMatriz(matriz2,[]);
	htmlString += "=";
	htmlString += pintaMatriz(matrizResultado,[]);
	htmlString += 	 "\\) \<br /\>\<br /\>";

	for (var i = 0; i < matriz1.length; i++) {
		for (var j = 0; j < matriz1[i].length; j++) {
			htmlString += "\\(";
			htmlString += pintaMatriz(matriz1,[""+i+","+j]);
			htmlString += "-";
			htmlString += pintaMatriz(matriz2,[""+i+","+j]);
			htmlString += "=";
			matrizResultado[i][j] = ""+ (matriz1[i][j] >= 0 ? matriz1[i][j] : ("("+matriz1[i][j]+")")) + "-" + (matriz2[i][j] >= 0 ? matriz2[i][j] :"("+matriz2[i][j]+")");
			htmlString += pintaMatriz(matrizResultado,[""+i+","+j]);
			htmlString += 	 "\\) \<br /\>\<br /\>";
		};
	};
	for (var i = 0; i < matriz1.length; i++) {
		for (var j = 0; j < matriz1[i].length; j++) {
			matrizResultado[i][j] = parseFloat(matriz1[i][j]) - parseFloat(matriz2[i][j]);		
		};
	};
	htmlString += "\\("
	htmlString += pintaMatriz(matriz1,[]);
	htmlString += "-";
	htmlString += pintaMatriz(matriz2,[]);
	htmlString += "=";
	htmlString += pintaMatriz(matrizResultado,[]);
	htmlString += 	 "\\) \<br /\>\<br /\>";	

	return htmlString;
}

/* Función para resolver Producto punto
	recibe las matrices que se restaran
	regresa la resolución de las matrices en formato TeX
*/
function resuelvePunto(matriz1, matriz2){
	var matrizResultado = new Array();
	for (var i = 0; i < matriz1.length; i++) {
		var tempArr = new Array();
		for (var j = 0; j < matriz1[i].length; j++) {
			tempArr[j] = "  . "
		};

		matrizResultado[i] = tempArr;
	};


	// Pinta matrices a resolver, resultado vacío.
	var htmlString = "\\("	
	htmlString += pintaMatriz(matriz1,[]);
	htmlString += "\\cdot";
	htmlString += pintaMatriz(matriz2,[]);
	htmlString += "=";
	htmlString += pintaMatriz(matrizResultado,[]);
	htmlString += 	 "\\) \<br /\>\<br /\>";

	for (var i = 0; i < matriz1.length; i++) {		
		for (var j = 0; j < matriz1[i].length; j++) {
			for(var mmm = 0; mmm < 2; mmm++ ){
				htmlString += "\\(";
				htmlString += pintaMatriz(matriz1,obtenRenglonPaColor(i,matriz1[i].length));
				htmlString += "\\cdot";
				htmlString += pintaMatriz(matriz2,obtenColumnaPaColor(j,matriz1.length));
				htmlString += "=";
				matrizResultado[i][j] = "";			
				for (var k = 0; k < matriz1.length; k++) {
					if(mmm==0){
						matrizResultado[i][j] += ""+ matriz1[i][k] + "*" + matriz2[k][j] ;
						if( k < matriz1.length-1 ){
							matrizResultado[i][j]	+= "+"
						}
					}
					else{
						if(k==0){matrizResultado[i][j] = 0}
						matrizResultado[i][j] = parseFloat(matrizResultado[i][j]) + (parseFloat(matriz1[i][k]) * parseFloat( matriz2[k][j]));
					}
				};
				htmlString += pintaMatriz(matrizResultado,[""+i+","+j]);
				htmlString += 	 "\\) \<br /\>\<br /\>";
			};
		};
	};


	for (var i = 0; i < matriz1.length; i++) {		
		for (var j = 0; j < matriz1[i].length; j++) {
			matrizResultado[i][j] = 0;
			for (var k = 0; k < matriz1.length; k++) {						
						matrizResultado[i][j] += (parseFloat(matriz1[i][k]) * parseFloat( matriz2[k][j]));				
			}
		}
	}
	htmlString += "\\("
	htmlString += pintaMatriz(matriz1,[]);
	htmlString += "\\cdot";
	htmlString += pintaMatriz(matriz2,[]);
	htmlString += "=";
	htmlString += pintaMatriz(matrizResultado,[]);
	htmlString += 	 "\\) \<br /\>\<br /\>";	

	return htmlString;
}

/* Función para resolver determinante
	recibe la matriz que de la que se obtendrá su determinante
	regresa el determinante de la matriz en formato TeX
*/
function resuelveDet2(matriz1){	
	
	var htmlString = "\\("	
	htmlString += pintaDeterminante(matriz1,["0,0","1,1"]);	
	htmlString += "=";
	htmlString += "\\color{red}{";
	htmlString += "(" + matriz1[0][0] + ")";
	htmlString += "\\cdot";
	htmlString += "(" + matriz1[1][1] + ")";
	htmlString += "}";
	htmlString += "-";
	htmlString += "(" + matriz1[0][1] + ")";
	htmlString += "\\cdot";
	htmlString += "(" + matriz1[1][0] + ")";
	htmlString += "=";
	htmlString += "\\color{red}{";
	htmlString += parseFloat( matriz1[0][0])* parseFloat( matriz1[1][1]);
	htmlString += "} -";
	htmlString += parseFloat( matriz1[0][1])* parseFloat( matriz1[1][0]);
	htmlString += "=";
	htmlString += (parseFloat( matriz1[0][0])*parseFloat( matriz1[1][1]))-(parseFloat( matriz1[0][1])* parseFloat( matriz1[1][0]));
	
	htmlString += 	 "\\) \<br /\>\<br /\>";	

	return htmlString;
}


function obtenColumnaPaColor(columna, tamanio){
	var arr = new Array();
	for (var i = 0; i < tamanio; i++) {
		arr[i]= ""+i+","+columna;
	};
	//alert(arr);
	return arr;
}

function obtenRenglonPaColor(renglon, tamanio){
	var arr = new Array();
	for (var i = 0; i < tamanio; i++) {
		arr[i]= ""+renglon+","+i;
	};
	return arr;
}

var colores = ["red","blue","green","cyan","magenta","yellow"];
function resuelveTranspuesta(matriz){
	var htmlString = "\\("	
	

	htmlString += " Trans\\left(\\begin{matrix}";
	var k = 0;
	for (var i = 0; i < matriz.length; i++) {			
		for (var j = 0; j < matriz[i].length; j++) {				

			
			htmlString += "  \\color{";
			htmlString +=   colores[i%colores.length];
			htmlString +=   "}{ "
			
			if(isNumber(matriz[i][j])){				
				htmlString += (Math.round(matriz[i][j]*100)/100);
			}
			else{
				htmlString += matriz[i][j];
			}
			
			htmlString += "  } "	
			
			if(j < matriz[i].length -1){
				htmlString += " & "
			}
			k++;
		}
		if(i < matriz.length -1){
			htmlString += "\\\\";
		}		
	}
	htmlString += "\\end{matrix}\\right)";

	htmlString += "=";
	
	htmlString += " \\left(\\begin{matrix}";
	k=0;
	for (var i = 0; i < matriz.length; i++) {			
		for (var j = 0; j < matriz[i].length; j++) {				

			
			htmlString += "  \\color{";
			htmlString +=   colores[j%colores.length];
			htmlString +=   "}{ "
			
			if(isNumber(matriz[i][j])){				
				htmlString += (Math.round(matriz[j][i]*100)/100);
			}
			else{
				htmlString += matriz[j][i];
			}

			
			htmlString += "  } "	
			
			if(j < matriz[i].length -1){
				htmlString += " & "
			}
			k += matriz[i].length;
		}
		if(i < matriz.length -1){
			htmlString += "\\\\";
		}
		
	}
	htmlString += "\\end{matrix}\\right)";

	htmlString += 	 "\\) \<br /\>\<br /\>";	

	return htmlString;
}

/**
 * 
 */
function resuelveInversa(matriz){
	// Matrices originales
	var htmlString = "\\(";
	htmlString += pintaMatriz(matriz);
	htmlString += "\\left|\\right|"
	var identidad = generaIdentidad(matriz[0].length);
	htmlString += pintaMatriz(identidad);
	htmlString += "\\) \<br /\>";

	// Matrices para almacenar el resultado numérico
	var matrizRes = [];
	var identidadRes = [];

	for (var k = 0; k < matriz[0].length; k++) {	
		matrizRes = [];
		identidadRes = [];

		for (var g = 0; g < matriz[0].length; g++) {			
			matrizRes[g]=[];
			identidadRes[g]=[]
		};		

		var indice = parseFloat(matriz[k][k]);
		for (var i = 0; i < matriz[0].length; i++) {						
			for (var j = 0; j < matriz[0].length; j++) {
				if(j==k){
					matrizRes[j][i] = (Math.round((parseFloat(matriz[j][i])/parseFloat(indice))*100)/100);
					matriz[j][i] = ( matriz[j][i] == indice ? 1 :("\\frac{"+matriz[j][i]+"}{"+indice+"}"));
					identidadRes[j][i] = (Math.round((parseFloat(identidad[j][i])/parseFloat(indice))*100)/100);
					identidad[j][i] = ( identidad[j][i] == 0 ? 0 :("\\frac{"+identidad[j][i]+"}{"+indice+"}"));
				} else{
					matrizRes[j][i] = parseFloat(matriz[j][i]);
					identidadRes[j][i] = parseFloat(identidad[j][i]);
				}
			};
		};	

		htmlString += "\\(";
		htmlString += pintaMatriz(matriz);
		htmlString += "\\left|\\right|"
		htmlString += pintaMatriz(identidad);
		htmlString += "\\) \<br /\>";
		matriz = matrizRes;
		identidad = identidadRes;
		htmlString += "\\(";
		htmlString += pintaMatriz(matriz);
		htmlString += "\\left|\\right|"
		htmlString += pintaMatriz(identidad);
		htmlString += "\\) \<br /\>";

		matrizRes = [];
		identidadRes = [];

		for (var g = 0; g < matriz[0].length; g++) {			
			matrizRes[g]=[];
			identidadRes[g]=[]
		};		

		for (var j = 0; j < matriz[0].length; j++) {		
			if(j!=k){
				var aux = matriz[j][k];
				for (var i = 0; i < matriz[0].length; i++) {													
					matrizRes[j][i] = ((Math.round( (parseFloat(matriz[j][i]) - (aux*parseFloat(matriz[k][i]))  )*100))/100);
					matriz[j][i] =  matriz[j][i] + "-("+ aux + "*" + matriz[k][i]+")";
					identidadRes[j][i] = ((Math.round( (parseFloat(identidad[j][i]) - (aux*parseFloat(identidad[k][i]))  )*100))/100);
					identidad[j][i] = identidad[j][i] + "-("+ aux + "*" + identidad[k][i]+")";;
				} 
			}else{
				for (var i = 0; i < matriz[0].length; i++) {
					matrizRes[j][i] = parseFloat(matriz[j][i]);
					identidadRes[j][i] = parseFloat(identidad[j][i]);
				}

			}
		};

		// Agrega las matrices procesadas al resultado.
		htmlString += "\\(";
		htmlString += pintaMatriz(matriz);
		htmlString += "\\left|\\right|"
		htmlString += pintaMatriz(identidad);
		htmlString += "\\) \<br /\>";
		matriz = matrizRes;
		identidad = identidadRes;
		htmlString += "\\(";
		htmlString += pintaMatriz(matriz);
		htmlString += "\\left|\\right|"
		htmlString += pintaMatriz(identidad);
		htmlString += "\\) \<br /\>";
	}
	return htmlString;
}

/**
 * Función que genera una matriz identidad de nxn
 */
function generaIdentidad(n){
	var matrizResultado = new Array();
	for (var i = 0; i < n; i++) {
		var tempArr = new Array();
		for (var j = 0; j < n; j++) {
			if(i == j){
				tempArr[j] = 1;	
			}else{
				tempArr[j] = 0;	
			}
			
		};
		matrizResultado[i] = tempArr;
	};
	return matrizResultado;
}