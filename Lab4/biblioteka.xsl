<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" version="1.0" />

	<xsl:template match="/">
		<html>
			<head>
				<title>Biblioteka</title>
				<link rel="stylesheet" href="style.css" type="text/css" />
			</head>
			<body>
				<table class="main-table">
					<thead>
						<tr>
							<th colspan="4">Biblioteka</th>
						</tr>
					</thead>
					<tbody>

						<xsl:for-each select="biblioteka/dzial">
							<xsl:sort select="nazwa/text()" />
							<tr>
								<td>
									<xsl:call-template name="dzial" />

								</td>
							</tr>
						</xsl:for-each>

					</tbody>
				</table>
			</body>
		</html>
	</xsl:template>

	<xsl:template name="dzial">
		<table class="section-table">
			<thead>
				<tr>
					<th colspan="4">
						<xsl:value-of select="nazwa" />
					</th>
				</tr>
			</thead>
			<tbody>
				<tr class="col-names">
					<td>Numer</td>
					<td>Imie</td>
					<td>Nazwisko</td>
					<td>Tytul</td>
				</tr>
				<xsl:for-each select="ksiazka">
					<xsl:sort select="autor/nazwisko/text()" />
					<xsl:call-template name="ksiazka" />
				</xsl:for-each>
			</tbody>
		</table>
	</xsl:template>

	<xsl:template name="ksiazka">
		<tr>
			<td>
				<xsl:number value="position()" format="1" />
			</td>
			<td>
				<xsl:value-of select="autor/imie" />
			</td>
			<td>
				<xsl:value-of select="autor/nazwisko" />
			</td>
			<td>
				<xsl:value-of select="tytul" />
			</td>
		</tr>
	</xsl:template>

</xsl:stylesheet>