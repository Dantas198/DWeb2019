<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    <xsl:output method="xhtml" indent="yes" encoding="UTF-8"/>
    <xsl:template match="/">
            <html>
                <head>
                    <title>
                        Arquivo de Arqueositios
                    </title>
                    <meta charset="UTF8"/>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/> 
                </head>
                <body>
                    <h1>Arqueosítios do NW Português</h1>
                    <h3>Índice (por concelhos)</h3>
                    <ul>
                        <xsl:apply-templates select="//ARQELEM[not(preceding::CONCEL=./CONCEL)]">
                            <xsl:sort select="normalize-space(CONCEL)"/>
                        </xsl:apply-templates>
                    </ul>
                </body>
            </html>
        
    </xsl:template>
    
    <xsl:template match="ARQELEM">
        <xsl:variable name="c" select="CONCEL"/>
        <li>
            <xsl:value-of select="CONCEL"/>
            <ol>
                <xsl:apply-templates select="//IDENTI[../CONCEL=$c]">
                    <xsl:sort select="."/>
                </xsl:apply-templates>
            </ol>
        </li>
    </xsl:template>
    
    <xsl:template match="IDENTI">
            <li>
                //<a name="{generate-id()}"/>
                <a href="{count(../preceding-sibling::*)+1}"><xsl:value-of select="."/></a>
            </li>
    </xsl:template>    
</xsl:stylesheet>