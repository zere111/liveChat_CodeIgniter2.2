<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Login extends CI_Controller {
 function Login()
	{
		parent::__construct();
		$this->load->helper('url');
	}
	
 public function index($page = 'login')
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
	
	function checkLogin(){
		$this->load->model('my_m');
		$this->load->helper('security');
		$user=$this->my_m->ci_user_select($_POST['uname']);
		if($user){
			if($user[0]->password==do_hash($_POST['upass'], 'md5')){
				echo '<br>right password';
				echo '<br>WELCOME!';
				$this->load->library('session');
				$arr=array('username'=>$user[0]->uid);
				$this->session->set_userdata($arr);
				echo $this->session->userdata('username');
			}else{
				echo '<br>wrong password';
			}
		
			}else{
			echo '<br>no user';
		}
	}
	function checksession(){
		$this->load->library('session');
		if($this->session->userdata('username')){
			echo '<hr>already login';
		}else{
			echo '<hr>havn\'t login';
		}
	}
	function  logout(){
		$this->load->library('session');
		$this->session->unset_userdata('username');
	}
	
}

?>