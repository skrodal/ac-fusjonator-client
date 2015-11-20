<section id="pageLoading" class="content app_page">
	<div class="row">
		<div class="col-lg-12">
			<div class="callout bg-aqua">
			    <h4>Autentiserer</h4>
			    <p>Vennligst vent...</p>

				<div class="progress">
			        <div id="authProgressBar" class="progress-bar progress-bar-light-blue" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 0%"><!-- updateProgress --></div>
			    </div>
			</div>

			<div id="authError" class="alert alert-danger hidden">
				<h4><i class="icon fa fa-ban"></i> Beklager! P&aring;loggingsprosessen har dessverre feilet ;-(</h4>
				<p>
					<strong>
						Rapporterte feil ser du under. Du kan fors&oslash;ke &aring; laste siden p&aring; nytt eller rapportere feilen til
						<a href="mailto:support@ecampus.no">support@ecampus.no</a>
					</strong>
				</p>
			</div>

			<div class="panel">
				<div class="panel-body">
					Tjenesten bruker <a href="http://www.feideconnect.no" target="_blank">(Feide)Connect fra UNINETT</a> for autentisering og dataflyt.
				</div>
			</div>
		</div>
	</div>
</section>


<script src="app/js/etc/utils.js"></script>
<!-- JSO -->
<script src="app/js/auth/jso.js"></script>
<script src="app/js/auth/feideconnect_auth.js"></script>

<!-- APIs -->
<script src="app/js/consumers/feideconnect.js"></script>
