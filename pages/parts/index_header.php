<header class="main-header">
	<!-- Logo -->
	<a href="../../index.php" class="logo">
	    <img src="dist/adminlte/img/UNINETT_logo_dark_gray.svg" alt="UNINETT logo" type="image/svg+xml">
	</a>
	<!-- Header Navbar -->
	<nav class="navbar navbar-static-top" role="navigation">
	    <!-- Sidebar toggle button-->
		<a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
			<span class="sr-only">Vis/skjul meny</span>
		</a>

		<span class="navbar-title"><strong>Connect</strong>Fusjonator &trade;&reg;<sup><small class="small">&copy; etc</small></sup></span>

		<!-- Navbar Right Menu -->
		<div class="navbar-custom-menu">
			<ul class="nav navbar-nav">
				<!-- User Account Menu -->
				<li id="userMenu" class="dropdown user user-menu hidden">
					<!-- Menu Toggle Button -->
					<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						<!-- The user image in the navbar-->
						<img src="" class="user-image userImage" alt="User Image"><!-- updateUserUI -->
						<!-- hidden-xs hides the username on small devices so only the image appears.-->
						<span class="hidden-xs userFirstName"><!--updateUserUI--></span>

					</a>
					<ul class="dropdown-menu">
						<!-- The user image in the menu -->
						<li class="user-header">
							<img src="" class="img-circle userImage" alt="User Image"><!-- updateUserUI -->
	                        <p><span class="userFullName"><!--updateUserUI--></span></p>

								<span class="label bg-orange icon ion-ios-home feideOrg"><!--updateUserUI--></span>
								<span class="label bg-orange icon ion-university feideAffiliation"><!--updateUserUI--></span>
								<span class="label bg-orange icon ion-ios-star userRole"><!--updateUserUI--></span>

						</li>
						<!-- Menu Footer-->
						<li class="user-footer">
							<div class="pull-right">
								<a href="https://auth.feideconnect.no/logout" onclick="jso.wipeTokens();" class="btn btn-flat ion-log-out"> Logg ut</a>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</nav>
</header>