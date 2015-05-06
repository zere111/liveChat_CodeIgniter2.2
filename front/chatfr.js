var contentArr = new Array(); //store all the chat content
var newContentArr = new Array(); //store all the new content
var lastOldContentId = 0; //store the id of last received olf content
var lastNewContentId = 0; //store the id of last received new content
var lastMarkedNewContentId = 0; //store the id of the last new content marked to tag
var countTime;
var currentDate;
var currentTime; 
var activeChat; //store the chatid of actived chat
var chatUser; //store the user's name

//check if there is chat content*****
function checkChatContent(contentStatus){
	var chatContentStatus = jQuery.param({"chatId": window.activeChat ,"contentStatus": contentStatus});
	$.ajax({
		type:"POST",
		url:"http://myaoliao.com/kmallconz/livechat/index.php/chat/checkChatContentFr",
		cache:false,
		data:chatContentStatus,
		success:function(data){	
			if(data){
				contentData=JSON.parse(data);
				if(window.newContentArr.length > 0){
					$.each(contentData,function(n,value){
						valueId = parseInt(value.id ,10);
						if(valueId > window.lastNewContentId){
							window.newContentArr.push(value);
							window.lastNewContentId = valueId;
						}
					});	
				}else{
					$.each(contentData,function(n,value){
						valueId = parseInt(value.id ,10);
						if(valueId > window.lastNewContentId){
							window.newContentArr.push(value);
							window.lastNewContentId = valueId;
						}
					});
				}
			}
		},
		error:function(){
			alert("failed to receive chat content");
		}		
	});
}
//mark new chat content
function markNewChatContent(){
	var contentStatus = 12;
	checkChatContent(contentStatus);
	$.each(window.newContentArr,function(n,value){
		//add new content notices to each tag*********
		valueId = parseInt(value.id ,10);
		if(value.id > window.lastMarkedNewContentId){
			//var ContentNotice = $("button[chatid="+value.cid+"] span").text();
			//ContentNotice = parseInt(ContentNotice,10);
			//ContentNotice = ContentNotice + 1;
			//$("button[chatid="+value.cid+"] span").text(ContentNotice);
			window.lastMarkedNewContentId = valueId;
		}
	});
	contentStatus = 21;
	checkChatContent(contentStatus);
	$.each(window.newContentArr,function(n,value){
		//add new content notices to each tag*********
		valueId = parseInt(value.id ,10);
		if(value.id > window.lastMarkedNewContentId){
		//	var ContentNotice = $("button[chatid="+value.cid+"] span").text();
		//	ContentNotice = parseInt(ContentNotice,10);
		//	ContentNotice = ContentNotice + 1;
		//	$("button[chatid="+value.cid+"] span").text(ContentNotice);
			window.lastMarkedNewContentId = valueId;
		}
	});
}
//load the new content to the active chat
function loadNewChatContent(activeChat){
	$.each(window.newContentArr,function(n,value){
		if(value.id>window.lastOldContentId){
			if((value.cid == activeChat)&&(value.contentStatus==12)){
				var newline='<tr><th>'+value.time+'</th><th>'+value.user+'</th><th>'+value.content+'</th></tr>';
				if($(".table").children()){
					$(".table").append(newline);
				}else{
					$(".table").children().last().append(newline);
				}
				value.contentStatus = 22;
				window.contentArr.push(value);
				window.lastOldContentId = value.id;
				var ContentNotice = $("button[chatid="+value.cid+"] span").text();
				ContentNotice = parseInt(ContentNotice,10);
				ContentNotice = ContentNotice - 1;
				$("button[chatid="+value.cid+"] span").text(ContentNotice);
			}else if((value.cid == activeChat)&&(value.contentStatus==21)){
				var newline='<tr><th>'+value.time+'</th><th>'+value.user+'</th><th>'+value.content+'</th></tr>';
				if($(".table").children()){
					$(".table").append(newline);
				}else{
					$(".table").children().last().append(newline);
				}
				value.contentStatus = 22;
				window.contentArr.push(value);
				window.lastOldContentId = value.id;
				var ContentNotice = $("button[chatid="+value.cid+"] span").text();
				ContentNotice = parseInt(ContentNotice,10);
				ContentNotice = ContentNotice - 1;
				$("button[chatid="+value.cid+"] span").text(ContentNotice);
			}else{
				var newline='<tr><th>'+value.time+'</th><th>'+value.user+'</th><th>'+value.content+'</th></tr>';
				if($(".table").children()){
					$(".table").append(newline);
				}else{
					$(".table").children().last().append(newline);
				}
				window.contentArr.push(value);
				window.lastOldContentId = value.id;
				var ContentNotice = $("button[chatid="+value.cid+"] span").text();
				ContentNotice = parseInt(ContentNotice,10);
				ContentNotice = ContentNotice - 1;
				$("button[chatid="+value.cid+"] span").text(ContentNotice);
			}
		}
	});
	changeContentStatus(21,activeChat,22);
}
//change the chat status from pre status to tar status
function changeChatStatus(preChatStatus,cid,tarChatStatus){
	var chatStatusData = jQuery.param({ "preChatStatus":preChatStatus,"cid": cid,"tarChatStatus":tarChatStatus});
	$.ajax({
		type:"POST",
		url:"http://myaoliao.com/kmallconz/livechat/index.php/chat/changeChatStatus",
		cache:false,
		data:chatStatusData,
		success:function(data){		
		},
		error:function(){
			alert("failed to change the chat status");
		}		
	});
}

//change the content status from pre status to tar status
function changeContentStatus(preContentStatus,cid,tarContentStatus){
	var chatContentData = jQuery.param({ "preContentStatus":preContentStatus,"cid": cid,"tarContentStatus":tarContentStatus});
	$.ajax({
		type:"POST",
		url:"http://myaoliao.com/kmallconz/livechat/index.php/chat/changeContentStatus",
		cache:false,
		data:chatContentData,
		success:function(data){		
		},
		error:function(){
			alert("failed to change the content status");
		}		
	});
}
//auto receive new chat content every 3s
function autoReceive(){	
	//markNewChatContent();
	if(window.activeChat){
	var contentStatus = 21;
	checkChatContent(contentStatus);
	contentStatus = 12;
	checkChatContent(contentStatus);
	contentStatus = 22;
	checkChatContent(contentStatus);
	loadNewChatContent(window.activeChat);
	}
	countTime=setTimeout("autoReceive()",1000);
}
//start a new chat
function startChat(chatUser,userEmail,currentDate,currentTime){
	var chatData = jQuery.param({"user": chatUser, "email": userEmail, "date":currentDate,"time":currentTime});
	$.ajax({
		type:"POST",
		url:"http://myaoliao.com/kmallconz/livechat/index.php/chat/newChat",
		cache:false,
		data:chatData,
		success:function(data){	
			if(data){
				chatData=JSON.parse(data);
				$.each(chatData,function(n,value){
					window.activeChat = value.id;
				});
			}
		},
		error:function(){
			alert("failed to start a new chat");
		}		
	});
}
//send chat content
function sendContent(chatId,chatUser,newContent,currentDate,currentTime){
	var contentStatus = 12;
	var chatContentData = jQuery.param({ "cid": chatId, "user": chatUser, "content": newContent, "date":currentDate,"time":currentTime,"contentStatus":contentStatus});
	$.ajax({
		type:"POST",
		url:"http://myaoliao.com/kmallconz/livechat/index.php/chat/receiveChatContent",
		cache:false,
		data:chatContentData,
		success:function(data){
			$("textarea[name=content]").val("");
		},
		error:function(){
			alert("failed to send the message");
		}		
	});
}
//confirm close the chat
function closeConfirm(closeId){
	var r=confirm("Do you really want to close the chat?")
	if (r==true)
	{
	  changeChatStatus(2,closeId,3);
	  changeContentStatus(2,closeId,3);
	  alert("This chat was closed!");
	  $(".table").empty();
	  $("button[chatid="+closeId+"]").parent().remove();
	}else{
	   	alert("This chat will keeping running!");
	}
}
//set date and time
function dateSet(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;    //js从0开始取 
    var date1 = date.getDate(); 
    var hour = date.getHours(); 
    var minutes = date.getMinutes(); 
    var second = date.getSeconds();
    window.currentDate=year+"-"+month+"-"+date1;
    window.currentTime=hour+":"+minutes +":"+second;
 }

//**************run all function***********************
$(document).ready(function() {
//start a new chat
$('#startChat').click(function(){
	window.chatUser = $("input[name=user]").val();
	var userEmail = $("input[name=email]").val();
	dateSet();
	startChat(window.chatUser,userEmail,window.currentDate,window.currentTime);
	$("#startNewChat").slideUp(1000);
});
//sned content 
$("#sendContent").click(function(){
	 var chatId=window.activeChat;
	// var chatUser=window.runChatDataArr[0].user; 
	 var chatUser= window.chatUser;  //frontend user is the chat service
	 var newContent=$("textarea[name=content]").val();
	 if(newContent){
		 dateSet();
		 sendContent(chatId,chatUser,newContent,window.currentDate,window.currentTime);
	 }else{
		 alert("Can't send blank message");
	 }
});	
//add click event to all new close button- close the choosed chat
$("ol").on("click",".close",function(){
	if($(this).prev().attr('chatid')){
	var closeId = $(this).prev().attr('chatid');
	closeConfirm(closeId);				
	}
});
//autocheck new chat content every 1s
autoReceive();
});