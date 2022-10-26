<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" version="1.0" />
	<xsl:template match="/">
		<html>
			<head>
				<meta charset="utf-8" />
				<title>
					Lista osob
				</title>
			</head>
			<body>
				<h1>
					Spis osob
				</h1>
				<table border="0">
					<thead>
						<tr>
							<th>
								miasto
							</th>
							<th>
								imie
							</th>
							<th>
								nazwisko
							</th>
							<th>
								pesel
							</th>
							<th>
								status
							</th>
						</tr>
					</thead>
					<tbody>
						<xsl:apply-templates select="//osoba" />
					</tbody>
				</table>
			</body>
		</html>
	</xsl:template>
	<xsl:template match="osoba">
		<tr>
			<td>
				<xsl:value-of select="../nazwa" />
			</td>
			<td>
				<xsl:value-of select="imie" />
			</td>
			<td>
				<xsl:value-of select="nazwisko" />
			</td>
			<td>
				<xsl:value-of select="@pesel" />
			</td>
			<td>
				<xsl:value-of select="status" />
			</td>
		</tr>
	</xsl:template>
</xsl:stylesheet>
