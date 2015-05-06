<?php
class My_model extends CI_Model{
	
	function __construct(){
		parent::__construct();
		$this->load->database();
	}
//***************************for users****************
	//add new user
	function ci_user_insert($arr){
		$this->db->insert('users',$arr);
	}
	//update user info
	function  ci_user_update($id,$arr){
		$this->db->where('id',$id);
		$this->db->update('users',$arr);
	}
	//delete user
	function ci_user_del($id){
		$this->db->where('id',$id);
		$this->db->delete('users');
	}
	//select user by username
	function ci_user_select($username){
		$this->db->where('uid',$username);
		$this->db->select('*');
		$query=$this->db->get('users');
		return $query->result();
	}
	//select all the users
	function ci_user_selectall(){
		$this->db->select('*');
		$query=$this->db->get('users');
		return $query->result();
	}
	//select user by limited numbers
	function ci_user_seleclimit($end,$start){
		$this->db->select('*');
		$this->db->limit($end,$start);  //limit($:how many,$:from where);
		$query=$this->db->get('users');
		return $query->result();
	}
//***************************for chat*****************
	//add new chat
	function ci_chat_insert($arr){
		$this->db->insert('chat',$arr);
	}
	//update the chat's status from 1 to 2
	function  ci_chat_updateot(){
		//$sql = "UPDATE `myaoliao_kmall_livechat`.`chat` SET `chatStatus` = \'1\' WHERE `chat`.`id` = 1;";
		$data = array('chatStatus'=>2);
		$this->db->where('chatStatus',1);
		$this->db->update('chat',$data);
	}
	//update the chat's status from 2 to 3
	function  ci_chat_updatett(){
		$data = array('chatStatus'=>3);
		$this->db->where('chatStatus',2);
		$this->db->update('chat',$data);
	}	
	//select the chat by chatStatus
	function ci_chat_selectSta($chatStatus){
		$this->db->where('chatStatus',$chatStatus);
		$this->db->select('*');
		$query=$this->db->get('chat');
		return $query->result();
	}
	//select the chat by user and date time
	function ci_chat_selectUser($chatUser,$date,$time){
		$condition = array('user'=>$chatUser,'date'=>$date,'time'=>$time);
		$this->db->where($condition);
		$this->db->select('*');
		$query=$this->db->get('chat');
		return $query->result();
	}
	//change the chatStatus from pre status to target status
	function ci_chatStatus_update($preChatStatus,$cid,$tarChatStatus){
		$condition = array('chatStatus'=>$preChatStatus,'id'=>$cid);
		$data = array('chatStatus'=>$tarChatStatus);
		$this->db->where($condition);
		$this->db->update('chat',$data);
	}
//***************************for chat content*************************
	//receive new chat content from the sender
	function ci_chatContent_insert($arr){
		$this->db->insert('chatContent',$arr);
	}
	//select the content by contentStatus
	function ci_content_selectSta($contentStatus){
		$this->db->where('contentStatus',$contentStatus);
		$this->db->select('*');
		$query=$this->db->get('chatContent');
		return $query->result();
	}
	//select the new content by chatid and contentStatus
	function ci_content_selectIdSta($chatId,$contentStatus){
		$condition = array('cid'=>$chatId,'contentStatus'=>$contentStatus);
		$this->db->where($condition);
		$this->db->select('*');
		$query=$this->db->get('chatContent');
		return $query->result();
	}
	//change the contentStatus from pre status to target status
	function ci_contentStatus_update($preContentStatus,$cid,$tarContentStatus){
		$condition = array('contentStatus'=>$preContentStatus,'cid'=>$cid);
		$data = array('contentStatus'=>$tarContentStatus);
		$this->db->where($condition);
		$this->db->update('chatContent',$data);
	}	
}

?>