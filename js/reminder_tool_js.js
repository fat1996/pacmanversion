var text1, text2, text3;
		var myVar1, myVar2, myVar3; 
		var check1=false;
		var check2=false;
		var check3=false;  
		var timing1=0;
		var timing2=0;
		var timing3=0;
		const conversion=1000*60;

text1=document.getElementsByName("area1")[0].value;
text2=document.getElementsByName("area2")[0].value;
text3=document.getElementsByName("area3")[0].value;

function showalert(){
	var notify;

	if(check1==true){
		text1=document.getElementsByName("area1")[0].value;
		notify = new Notification('Reminder!',{
			body:text1,
			icon:'/static/Remindericon.png'
					});
	}
	if(check2==true){
		text2=document.getElementsByName("area2")[0].value;
		notify = new Notification('Reminder!',{
			body:text2,
			icon:'/static/Remindericon.png'
					});
	}
	if(check3==true){
		text3=document.getElementsByName("area3")[0].value;
		notify = new Notification('Reminder!',{
			body:text3,
			icon:'/static/Remindericon.png'
					});
	}
				}

function timeinterval(remindernum){
	if(remindernum==1){
		timing1=document.getElementById("interval1").value;
		if(timing1==0){
			timing1=5;
		}
	}
	else if(remindernum==2){
		timing2=document.getElementById("interval2").value;
		if(timing2==0){
			timing2=5;
		}
	}
	else{
		timing3=document.getElementById("interval3").value;
		if(timing3==0){
			timing3=5;
		}
	}
}

function notify1() {
	if(document.getElementsByName("area1")[0].value==""){
		$("#error1").css("display", "block");
	}
	else{
		$("#error1").css("display", "none");
		check1=true;
		timeinterval(1);
		console.log(timing1);
		timing1 = timing1 * conversion;
		showalert();
		myVar1 = setInterval(showalert, timing1);	
	}
	
}
function notify2() {
	if(document.getElementsByName("area2")[0].value==""){
		$("#error2").css("display", "block");
	}
	else{
		$("#error2").css("display", "none");
		check2=true;
		timeinterval(2);
		console.log(timing2);
		timing2 = timing2 * conversion;
	showalert();
	myVar2 = setInterval(showalert, timing2);
	}
		
}
function notify3() {
	if(document.getElementsByName("area3")[0].value==""){
		$("#error3").css("display", "block");
	}
	else{
		$("#error3").css("display", "none");
		check3=true;
		timeinterval(3);
		console.log(timing3);
		timing3 = timing3 * conversion;
	showalert();
	myVar3 = setInterval(showalert, timing3);	
	}
	
}	

function stopalert1(){
	clearInterval(myVar1);
}
function stopalert2(){
	clearInterval(myVar2);
}
function stopalert3(){
	clearInterval(myVar3);
}