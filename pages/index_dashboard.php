<!-- Main content -->
    <section id="pageDashboard" class="content app_page hidden">
	    <div class="row">
			<div class="col-md-6">
				<!-- Session info (DEV) -->
				<div class="box box-info">
					<div class="box-header with-border">
						<h3 class="box-title ion-ios-information-outline"> Om tjenesten</h3>
						<div class="box-tools pull-right">
							<button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
						</div>
					</div>
					<div class="box-body">
						<p>
							Hei <span class="userFirstName"></span>!
						</p>
						<p>
							<strong>Connect</strong>Fusjonator brukes i forbindelse med fusjonering av læresteder.
							Den lar deg <code>migrere/fusjonere</code> eksisterende brukernavn i Adobe Connect til nye brukernavn.
						</p>

						<p>
							Dette gjøres ganske enkelt ved å endre Adobe Connects <code>login</code>-felt (som er brukernavnet) fra gammelt til nytt.
						</p>

						<p>
							Tjenesten krever at du har ei liste over alle brukernavn, gamle til nye, i CSV-format.
						</p>

						<p>
							For &aring; kunne bruke tjenesten MÅ du være ansatt i UNINETT!
						</p>
					</div><!-- /.box-body -->
				</div><!-- /.box -->
			</div>

			<div class="col-md-6">
				<!-- Session info (DEV) -->
				<div class="box box-info">
					<div class="box-header with-border">
						<h3 class="box-title ion-code-working"> Forutsetninger</h3>
						<div class="box-tools pull-right">
							<button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
						</div>
					</div>
					<div class="box-body">
						<p>
							Endring av brukernavn krever f&oslash;lgende <a href="https://no.wikipedia.org/wiki/CSV" target="_blank">CSV</a> <small><sup><i class="fa fa-external-link"></i></sup></small> struktur: :
						</p>
						<well>
<pre>
GAMMELT@HIN.NO, NYTT@UIT.no
karius@hin.no, karius@uit.no
baktus@hin.no, baktus@uit.no
kasper@hin.no, kasper@uit.no
jesper@hin.no, jesper@uit.no
..., ...
..., ...
</pre>
						</well>
						<p>
							...altså, ganske enkelt; gammelt brukernavn KOMMA nytt brukernavn NY LINJE osv. osv.
						</p>

						<p>
							Dersom lista inneholder brukernavn som ikke eksisterer i Adobe Connect vil disse glatt hoppes over.
						</p>
					</div><!-- /.box-body -->
					<div class="box-footer">
						<span class="text-muted icon ion-android-alert">&nbsp;
							<small>
								Inkluder <strong>kun</strong> datarader i CSV, <strong>ikke</strong> tittelrad!
							</small>
						</span>
					</div><!-- /.box-footer -->
				</div><!-- /.box -->
			</div>
		</div>

	    <div class="row">
			<div class="col-md-6">
				<!-- Session info (DEV) -->
				<div class="box box-warning collapsed-box">
					<div class="box-header with-border">
						<h3 class="box-title ion-code-working"> Sesjonsinformasjon (fra Feide Connect)</h3>
						<div class="box-tools pull-right">
							<button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i></button>
						</div>
					</div>
					<div class="box-body">
						<pre id="connectSessionInfo"></pre>
					</div><!-- /.box-body -->
				</div><!-- /.box -->
			</div>
		</div>
	</section>

<script src="app/js/app.js"></script>