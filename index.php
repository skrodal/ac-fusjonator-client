<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>ConnectFusjonator</title>
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
    <!-- Font Awesome Icons -->
    <link href="dist/adminlte/fonts/fontawesome/font-awesome.min.css" rel="stylesheet" type="text/css"/>
    <!-- Ionicons -->
    <link href="dist/adminlte/fonts/ionicons/ionicons.min.css" rel="stylesheet" type="text/css"/>
    <!-- Bootstrap 3.3.2 -->
    <link href="dist/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <!-- Site style -->
    <link href="dist/adminlte/css/AdminLTE.min.css" rel="stylesheet" type="text/css"/>
    <!-- Skin -->
    <link href="dist/adminlte/css/skins/skin-black.min.css" rel="stylesheet" type="text/css"/>

	<!-- jQuery 2.1.3 -->
    <script src="dist/jQuery/jQuery-2.1.3.min.js"></script>
    <!-- Bootstrap 3.3.2 JS -->
    <script src="dist/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
	  <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
  </head>

  <body class="skin-black fixed">
    <div class="wrapper">
      <!-- Main Header -->
	    <?php include_once('pages/parts/index_header.php'); ?>
      <!-- Left side column. contains the logo and sidebar -->
        <?php include_once('pages/parts/index_sidebar.php'); ?>


      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">

        <!-- Content Header (Page header) -->
        <section class="content-header">
          <h1>
            Adobe Connect
            <small>Fusjoneringsverktøy</small>
          </h1>
          <ol class="breadcrumb">
            <li class="text-muted"><a class="orgSharedMtgsURL" href="https://connect.uninett.no" target="_blank"><i class="icon ion-ios-settings"></i> Adobe Connect Central</a> <small><sup><i class="fa fa-external-link"></i></sup></small></li>
            <!-- <li class="active">4.32.2</li> -->
          </ol>
        </section>

        <!-- Main content -->

		<?php include_once('pages/index_login.php'); ?>
		<?php include_once('pages/index_dashboard.php'); ?>
		<?php include_once('pages/index_service.php'); ?>


        <div id="error_modal" class="modal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header bg-yellow-active">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                <h4 id="title" class="modal-title"></h4>
              </div>
              <div id="message" class="modal-body">
              </div>
              <div class="modal-footer bg-yellow-active">
                <button type="button" class="btn btn-default" data-dismiss="modal">Lukk</button>
              </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

      </div><!-- /.content-wrapper -->

      <!-- Main Footer -->
		<?php include_once('pages/parts/index_footer.php'); ?>

    </div><!-- ./wrapper -->

    <!-- AdminLTE App -->
    <script src="dist/adminlte/js/adminlte.min.js" type="text/javascript"></script>
    <script src="dist/slimScroll/jquery.slimscroll.min.js" type="text/javascript"></script>
    <script src="dist/csv/jquery.csv.js" type="text/javascript"></script>
  </body>
</html>