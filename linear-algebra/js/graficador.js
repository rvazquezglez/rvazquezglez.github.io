function dibujaGrid2() {	
	var xmin = $('#xmin').val();
	var xmax = $('#xmax').val();
	var ymin = $('#ymin').val();
	var ymax = $('#ymax').val();

	//alert("xmin:" + xmin);

	dibujaGrid(xmin,xmax,ymin,ymax);
}

function dibujaGrid(xMin, xMax, yMin, yMax) {	
	/*alert("xmin: "+xMin+"\n"+
		"xmax: "+xMax+"\n"+
		"ymin: "+yMin+"\n"+
		"ymax: "+yMax+"\n");*/
	initPicture(xMin,xMax,yMin,yMax);

	
	
	for(i = parseFloat(xMin); i < xMax; i++){
		text([i.toFixed(0),0],""+i.toFixed(0),"below");
	}

	for(i = parseFloat(yMin); i < yMax; i++){
		if(i.toFixed(0)!=0)
		text([0,i.toFixed(0)],""+i.toFixed(0),"left");
	}
}


$(document).ready(function(){
   $("#button").click(function(event){   	   	
   	pintaFunc1();   	
   });
 });

function pintaFunc1(){
	//fill = "yellow"
	stroke = "blue"
	plot($('#function1').val(),"func1")
}
