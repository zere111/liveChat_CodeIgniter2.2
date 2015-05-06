<?php

class History extends CI_Controller {
	
  function History()
	{
		parent::__construct();
		$this->load->helper('url');
	}

  public function view($page = 'history')
  {
  	if ( ! file_exists(APPPATH.'views/'.$page.'.php'))
  	{
  		// ҳ�治����
  		show_404();
  	}
  	
  	$data['title'] = ucfirst($page); // ��title�еĵ�һ���ַ���д
  	
  	$this->load->view('nav', $data);
  	$this->load->view($page, $data);
  	$this->load->view('footer', $data);
  }
}