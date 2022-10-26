<?xml version="1.0"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" />
  <xsl:template match="/">
    <html>
      <head>
        <title>Dane</title>
      </head>
      <body>
        <h1>Lista osob</h1>
        <table border="1">
          <xsl:for-each select="dane/miasto">
            <tr>
              <th colspan="2" align="center">
                <xsl:value-of select="nazwa" />
              </th>
            </tr>
            <xsl:for-each select="osoba">
              <tr>
                <td>
              pesel:
                </td>
                <td>
                  <xsl:value-of select="@pesel"/>
                </td>
              </tr>
              <xsl:for-each select="imie">
                <tr>
                  <td>imie:</td>
                  <td>
                    <xsl:value-of select="text()"/>
                  </td>
                </tr>
              </xsl:for-each>
              <tr>
                <td>
              nazwisko:
                </td>
                <td>
                  <xsl:value-of select="nazwisko"/>
                </td>
              </tr>
            </xsl:for-each>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>