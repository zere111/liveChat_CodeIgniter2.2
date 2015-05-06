<div class="panel panel-info" >
	<div class="panel-heading userInfo">
		<h3 class="panel-title">Name:</h3>
		<h3 class="panel-title">Email:</h3>
	</div>
	<div class="panel-body" >
		<div class="chatContent">
			<div class="contentBox">
			</div>					
			<div class="typebox">
				<form id="postForm" action="" method="POST" enctype="multipart/form-data" onsubmit="return postForm()">
					<fieldset>
						<textarea id="summernote" name="content"></textarea>
					</fieldset>
					<button type="submit" class="btn btn-primary" id="chatBoxSubm">Save changes</button>
					<button type="button" id="cancel" class="btn">Cancel</button>
				</form>
			</div>
		</div>
	</div>	
</div>