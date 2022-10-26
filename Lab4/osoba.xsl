<?xml version="1.0" encoding="UTF-8"?>
<stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<output method="html" version="1.0" />
	<template match="/">
		<html>
			<head>
				<title>
					Tabela osob
				</title>
			</head>
			<body>
				<h1>
					Lista osob
				</h1>
				<table border="1" cellpadding="5">
					<tr>
						<th>
							Imie
						</th>
						<th>
							Nazwisko
						</th>
					</tr>
					<apply-templates select="dane" />
				</table>
			</body>
		</html>
	</template>
	<template match="osoba">
		<tr>
			<td>
				<value-of select="imie" />
			</td>
			<td>
				<value-of select="nazwisko" />
			</td>
		</tr>
	</template>
</stylesheet>
