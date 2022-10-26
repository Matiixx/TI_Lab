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
        <xsl:apply-templates select="dane/miasto" />

      </body>
    </html>
  </xsl:template>
  <xsl:template match="miasto">
    <h3>
      <xsl:value-of select="./nazwa" />
    </h3>
    <table border="1">
      <thead>
        <tr>
          <th>
            Imie
          </th>
          <th>
            Nazwisko
          </th>
          <th>
             Status
          </th>
        </tr>
      </thead>
      <tbody>
        <xsl:for-each select="osoba">
          <xsl:sort select="nazwisko/text()" />
          <xsl:call-template name="osoba"/>
        </xsl:for-each>
      </tbody>
    </table>
  </xsl:template>
  <xsl:template name="osoba">
    <tr>
      <xsl:attribute name="class">
        <xsl:choose>
          <xsl:when test="status = 'emeryt'">green</xsl:when>
          <xsl:otherwise>red</xsl:otherwise>
        </xsl:choose>
      </xsl:attribute>
      <td>
        <xsl:number value="position()" format="1" />
      </td>
      <td>
        <xsl:value-of select="imie"/>
      </td>
      <td>
        <xsl:value-of select="nazwisko"/>
      </td>
      <td>
        <xsl:value-of select="status"/>
      </td>
    </tr>
  </xsl:template>
</xsl:stylesheet>