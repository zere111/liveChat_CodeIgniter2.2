<?php

class Chat extends CI_Controller {
	
  function Chat()
	{
		parent::__construct();
		$this->load->helper('url');
	}

  public function view($page = 'chat')
  {
  	if ( ! file_exists(APPPATH.'views/'.$page.'.php'))
  	{
  		// 页面不存在
  		show_404();
  	}
  	
  	$data['title'] = ucfirst($page); // 将title中的第一个字符大写
  	
  	$this->load->view('nav', $data);
  	$this->load->view($page, $data);
  	$this->load->view('chatbox', $data);
  	$this->load->view('footer', $data);
  }
}