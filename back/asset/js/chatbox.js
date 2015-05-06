var runChatDataArr = new Array(); //store all the running chat basic info
var newChatDataArr = new Array();
var contentArr = new Array(); //store all the chat content
var newContentArr = new Array(); //store all the new content
var lastOldContentId = 0; //store the id of last received olf content
var lastNewContentId = 0; //store the id of last received new content
var lastMarkedNewContentId = 0; //store the id of the last new content marked to tag
var countTime;
var currentDate;
var currentTime; 
var activeChat; //store the chatid of actived chat
//check if there is running chat
function checkRunChat(){
	$.ajax({
		type:"GET",
		url:"http://myaoliao.com/kmallconz/livechat/index.php/chat/checkRunChat",
		cache:false,
		success:function(data){
			if(data){
				chatData=JSON.parse(data);
				$.each(chatData,function(n,value){
					window.runChatDataArr.push(value);
				});	
				loadRunChat();				
			}else{
				alert('no running chat');
			}
		},
		error:function(){
			alert("failed to check running chat");
		}		
	});
}
//check if there is new chat created
function checkNewChat(){
	$.ajax({
		type:"GET",
		url:"http://myaoliao.com/kmallconz/livechat/index.php/chat/checkNewChat",
		cache:false,
		success:function(data){
			if(data){
				if(data){
					chatData=JSON.parse(data);
					$.each(chatData,function(n,value){
						newChatDataArr.push(value);
						window.runChatDataArr.push(value);
						changeChatStatus(1,value.id,2);	
					});	
					loadNewChat(newChatDataArr);	
				}
			}
		},
		error:function(){
			alert("failed to check new chat");
		}		
	});
}
//load running chat
function loadRunChat(){
	$.each(window.runChatDataArr,function(n,value){
		var liChat='<li><button type="button" class="chatTag btn btn-info" chatid="'+value.id+'">Chat:'+value.user+'|'+value.email+'<span class="badge">0</span></button><button type="button" class="close" aria-label="Close">x</button></li>';
		if($('#chatList').children()){
			$('#chatList').append(liChat);
		}else{
			$('#chatList').children().last().append(liChat);
		}
	});	
}
//load new chat
function loadNewChat(newChatDataArr){
	$.each(newChatDataArr,function(n,value){
		var liChat='<li><button type="button" class="chatTag btn btn-info"  chatid="'+value.id+'">Chat:'+value.user+'|'+value.email+'<span class="badge">0</span></buttom><button type="button" class="close" aria-label="Close">x</button></li>';
		if($('#chatList').children()){
			$('#chatList').append(liChat);
		}else{
			$('#chatList').children().last().append(liChat);
		}	
	});
	window.newChatDataArr.pop();
}
//check if there is chat content*****
function checkChatContent(contentStatus){
	var chatContentStatus = jQuery.param({ "contentStatus": contentStatus});
	$.ajax({
		type:"POST",
		url:"http://myaoliao.com/kmallconz/livechat/index.php/chat/checkChatContent",
		cache:false,
		data:chatContentStatus,
		success:function(data){		
			//alert(data);
			if(data){
				contentData=JSON.parse(data);
				if(contentStatus == 22){	
					if(window.contentArr.length > 0){
						$.each(contentData,function(n,value){
							valueId = parseInt(value.id ,10);
							lastId = parseInt(window.lastOldContentId ,10);
							if(valueId > lastId){
								window.contentArr.push(value);
							}
						});	
					}else{
						$.each(contentData,function(n,value){
							valueId = parseInt(value.id ,10);
							window.contentArr.push(value);	
							window.lastOldContentId = valueId;
						});
					}	
				}else{
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
							window.newContentArr.push(value);
							window.lastNewContentId = valueId;
						});
					}
				}
			}
		},
		error:function(){
			alert("failed to receive chat content");
		}		
	});
}
//load old chat content
function loadOldChatContent(activeChat){
	var contentStatus = 22;
	checkChatContent(contentStatus);
	$.each(window.contentArr,function(n,value){
		if((value.cid == activeChat)&&(value.contentStatus==22)){
			var newline='<tr><th>'+value.time+'</th><th>'+value.user+'</th><th>'+value.content+'</th></tr>';
			$(".table").append(newline);
		}
	});
}
//load new chat content
function markNewChatContent(){
	//alert(window.newContentArr);
	var contentStatus = 21;
	checkChatContent(contentStatus);
	$.each(window.newContentArr,function(n,value){
		//add new content notices to each tag*******
		valueId = parseInt(value.id ,10);
		if(valueId > window.lastMarkedNewContentId){
			var ContentNotice = $("button[chatid="+value.cid+"] span").text();
			ContentNotice = parseInt(ContentNotice,10);
			ContentNotice = ContentNotice + 1;
			$("button[chatid="+value.cid+"] span").text(ContentNotice);
			window.lastMarkedNewContentId = valueId;
		}
	});
	contentStatus = 12;
	checkChatContent(contentStatus);
	$.each(window.newContentArr,function(n,value){
		//add new content notices to each tag*******
		valueId = parseInt(value.id ,10);
		if(valueId > window.lastMarkedNewContentId){
			var ContentNotice = $("button[chatid="+value.cid+"] span").text();
			ContentNotice = parseInt(ContentNotice,10);
			ContentNotice = ContentNotice + 1;
			$("button[chatid="+value.cid+"] span").text(ContentNotice);
			window.lastMarkedNewContentId = valueId;
		}
	});	
}
//load the new content to the active chat
function loadNewChatContent(activeChat){
	$.each(window.newContentArr,function(n,value){
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
			//	window.newContentArr.pop();
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
			//	window.newContentArr.pop();
		}
	});
	$.each(window.contentArr,function(n,value){
		valueId = parseInt(value.id ,10);
		if((value.cid == activeChat)&&(valueId > window.lastNewContentId)){
			var newline='<tr><th>'+value.time+'</th><th>'+value.user+'</th><th>'+value.content+'</th></tr>';
			if($(".table").children()){
				$(".table").append(newline);
			}else{
				$(".table").children().last().append(newline);
			}
			window.lastOldContentId = valueId;
			window.lastNewContentId = valueId;
		}
	});
	changeContentStatus(12,activeChat,22);
	//changeContentStatus(12,activeChat,22);
}
//change the content status from pre status to tar status
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
//auto check new chat every 10s
function autoCheck(){	
	checkNewChat();
	countTime=setTimeout("autoCheck()",10000);
}
//auto receive new chat content every 3s
function autoReceive(){	
	markNewChatContent();
	var contentStatus = 22;
	checkChatContent(contentStatus);
	loadNewChatContent(window.activeChat);
	countTime=setTimeout("autoReceive()",1000);
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
		},
		error:function(){
			alert("failed to send the message");
		}		
	});
}
//inactive one chat
function inactiveChat(){
	$("button").filter(".btn-primary").addClass("btn-info");
	$("button").filter(".btn-primary").removeClass("btn-primary");
	$(".table").empty();
}
//confirm close the chat
function closeConfirm(closeId){
	  var r=confirm("Do you really want to close the chat?")
	  if (r==true)
	    {
		  changeChatStatus(2,closeId,3);
		  changeContentStatus(22,closeId,33);
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
  //summernote
	$('#summernote').summernote({
		 height: 150,                 // set editor height
		 focus: true,                 // set focus to editable area after initializing summernote
	});
	var postForm = function() {
		var content = $('textarea[name="content"]').html($('#summernote').code());
	};
	$("#send").click(function(){
		 var chatId=window.activeChat;
		// var chatUser=window.runChatDataArr[0].user; 
		 var chatUser="Kmall Team";  //backend user is the chat service
		 var newContent=$('#summernote').code();
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
//add click event to all new chat tag-- active the choosed chat
$("ol").on("click",".chatTag",function(){
	inactiveChat();
	window.activeChat=$(this).attr("chatid");
	$(this).removeClass("btn-info");
	$(this).addClass("btn-primary");
	loadOldChatContent(window.activeChat);
	loadNewChatContent(window.activeChat);
});
//test the arry length
$("#test").click(function(){
	alert("run array length:"+window.contentArr.length+"new array length:"+window.newContentArr.length);
});
//check running chat	
checkRunChat();	
//autocheck new chats every 10s
autoCheck();	
//autocheck new chat content every 3s
autoReceive();
});