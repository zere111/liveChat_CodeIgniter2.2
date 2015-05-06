<link href="asset/css/chat.css" rel="stylesheet">
<div class="container mainPage">
	<div class="col-md-4 chatMenu">
		<ol class="nav nav-pills nav-stacked" id="chatList">
		</ol>
	</div>
	<div class="col-md-8 chatBox" id="">
		<div class="panel panel-info" >
			<div class="panel-heading userInfo">
				<h3 class="panel-title" id="cusName">Chat Content</h3>
			</div>
			<div class="panel-body" >
				<div class="chatContent">
					<div class="contentBox">
						<table class="table table-striped">
						
					    </table>
					</div>	
					<hr>				
					<div class="typebox">
						<form id="postForm" action="" method="POST" enctype="multipart/form-data" onsubmit="return postForm()">
							<fieldset>
								<textarea id="summernote" name="content"></textarea>
							</fieldset>
							<button type="submit" class="btn" id="chatBoxSubm">Save changes</button>
							<button type="button" id="send" class="btn">Send</button>
						</form>
						<button type="button" id="test" class="btn">test</button>
					</div>
				</div>
			</div>	
		</div>
