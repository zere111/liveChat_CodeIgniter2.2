<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Chat extends CI_Controller {
	
  function Chat()
	{
		parent::__construct();
		$this->load->helper('url');
	}
//load the chat page
  public function index($page = 'chat')
  {
  	if ( ! file_exists(APPPATH.'views/'.$page.'.php'))
  	{
  		// 页面不存在
  		show_404();
  	}
  	
  	$data['title'] = ucfirst($page); // 将title中的第一个字符大写
  	
  	$this->load->view('nav', $data);
  	$this->load->view($page, $data);
  	//$this->load->view('chatbox', $data);
  	$this->load->view('footer', $data);
  }
//*************************for chat**********************
//create new chat
 function newChat(){
 	//allow cross site ajax
 	header('Access-Control-Allow-Origin:*');
 	//
 	//header('Access-Control-Allow-Credentials:true');
 	//header('Access-Control-Allow-Methods:GET, POST, OPTIONS');
 	$user = $_POST['user'];
 	$date = $_POST['date'];
 	$time = $_POST['time'];
  	$this->load->model('my_model');
  	$newChat = array('user'=>$user ,'email'=>$_POST['email'],'date'=>$date,'time'=>$time);
  	$this->my_model->ci_chat_insert($newChat);
  	//get the chat id
  	$startedNewChat = $this->my_model->ci_chat_selectUser($user,$date,$time);
  	echo json_encode($startedNewChat);
 }
 //check if there are new chats
 function checkNewChat(){
 	$this->load->model('my_model');
 	$chatStatus=1;
 	$newChat=$this->my_model->ci_chat_selectSta($chatStatus); //$chatStatus=1(unstarted)2(running)3(closed)
 	//var_dump($chat);
 	if($newChat){
 		foreach($newChat as $eachChat){
 			$eachChat=get_object_vars($eachChat);
 			$chatArr[]=$eachChat;
 		}
 		echo json_encode($chatArr);
 	}
 }
 //check if there are running chats
 function checkRunChat(){
 	$this->load->model('my_model');
 	$chatStatus=2;
 	$runChat=$this->my_model->ci_chat_selectSta($chatStatus); //$chatStatus=1(unstarted)2(running)3(closed)
 	//var_dump($chat);
 	if($runChat){
 		foreach($runChat as $eachChat){
 			$eachChat=get_object_vars($eachChat);
 			$chatArr[]=$eachChat;
 		}
 		echo json_encode($chatArr);
 		//return $returnChat;
 	}else{
 		echo "no result found";
 	}
 }
 //change the status of chat from pre to tar
 function changeChatStatus(){
 	//allow cross site ajax
 	header('Access-Control-Allow-Origin:*');
 	//
 	$this->load->model('my_model');
  	$this->my_model->ci_chatStatus_update($_POST['preChatStatus'],$_POST['cid'],$_POST['tarChatStatus']);
  }
//*************************for chat content***************************
 
  //receive new chat content
  function receiveChatContent(){
  	//allow cross site ajax
  	header('Access-Control-Allow-Origin:*');
  	//
  	$this->load->model('my_model');
  	$newChatContent=array('cid'=>$_POST['cid'],'user'=>$_POST['user'],'content'=>$_POST['content'],'date'=>$_POST['date'],'time'=>$_POST['time'],'contentStatus'=>$_POST['contentStatus']);
  	$this->my_model->ci_chatContent_insert($newChatContent);
  	//var_dump($newChatContent);
  }
  //check the chat content of the selected chat
  function checkChatContent(){
  	//allow cross site ajax
  	header('Access-Control-Allow-Origin:*');
  	//
  	$this->load->model('my_model');
	$contentStatus=$_POST['contentStatus'];
  	$newContent=$this->my_model->ci_content_selectSta($contentStatus); //$chatStatus=1(unstarted)2(running)3(closed)
  	if($newContent){
  		foreach($newContent as $eachContent){
  			$eachContent=get_object_vars($eachContent);
  			$contentArr[]=$eachContent;
  		}
  		echo json_encode($contentArr);
  	}
  }
  //check the chat content for the front end
  function checkChatContentFr(){
  	//allow cross site ajax
  	header('Access-Control-Allow-Origin:*');
  	//
  	$this->load->model('my_model');
  	$chatId=$_POST['chatId'];
  	$contentStatus=$_POST['contentStatus'];
  	$newContent=$this->my_model->ci_content_selectIdSta($chatId,$contentStatus); //$chatStatus=1(unstarted)2(running)3(closed)
  	if($newContent){
  		foreach($newContent as $eachContent){
  			$eachContent=get_object_vars($eachContent);
  			$contentArr[]=$eachContent;
  		}
  		echo json_encode($contentArr);
  	}
  }
  //change the status of chat content from pre to tar
  function changeContentStatus(){
  	//allow cross site ajax
  	header('Access-Control-Allow-Origin:*');
  	//
  	$this->load->model('my_model');
  	$this->my_model->ci_contentStatus_update($_POST['preContentStatus'],$_POST['cid'],$_POST['tarContentStatus']);
  }
  
}