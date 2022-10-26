<?xml version="1.0"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" />

  <xsl:template match="/">
    <html>
      <head>
        <link rel="stylesheet" href="style.css" type="text/css" />
        <title>Biblioteka</title>
      </head>
      <body>
        <table border="3">
          <thead>
            <tr>
              <th class="main-header" colspan="4">Podział na działy</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="biblioteka/dzial">
              <xsl:sort select="nazwa/text()" />
              <xsl:call-template name="dzial"/>
            </xsl:for-each>
          </tbody>
        </table>
      </body>
    </html>
  </xsl:template>

  <xsl:template name="dzial">
    <table border="1" class="section">
      <tr>
        <td class="section-name" colspan="4">
          <xsl:value-of select="nazwa" />
        </td>
      </tr>
      <tr class="col-names">
        <td>Tytul</td>
        <td>Nazwisko</td>
        <td>Imie</td>
        <td>Cena</td>
      </tr>
      <xsl:for-each select="ksiazka">
        <xsl:sort select="autor/nazwisko/text()" />
        <xsl:call-template name="ksiazka" />
      </xsl:for-each>
    </table>
  </xsl:template>

  <xsl:template name="ksiazka">
    <tr>
      <td>
        <xsl:value-of select="tytul"/>
      </td>
      <td>
        <xsl:value-of select="autor/nazwisko"/>
      </td>
      <td>
        <xsl:value-of select="autor/imie"/>
      </td>
      <td>
        <xsl:value-of select="cena"/>
      </td>
    </tr>
  </xsl:template>

</xsl:stylesheet>