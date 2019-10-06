<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    <xsl:output method="xhtml" indent="yes" encoding="UTF-8"/>
    <xsl:template match="/">
        <xsl:result-document href="websiteArqueositios/website.html">
            <html>
                <head>
                    <title>
                        Arquivo de Arqueositios
                    </title>
                    <meta charset="UTF8"/>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/> 
                </head>
                <body>
                    <div class="w3-container">
                        <h3>Índice de Arqueosítios</h3>
                        <ol>
                            <xsl:apply-templates mode="indice"/>
                        </ol>
                    </div>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="{generate-id()}"/>
            <a href="arqueositios/arq-{generate-id()}.html"><xsl:value-of select="IDENTI"/></a>
        </li>
    </xsl:template>
    
    <xsl:template match="ARQELEM">
        <xsl:result-document href="websiteArqueositios/arqueositios/arq-{generate-id()}.html">
            <html>
                <head>
                    <title>Página de um arqueosítio</title>                      
                        <meta charset="UTF8"/>
                        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>                    
                </head>
                <body>
                    <div class="w3-container">
                        <h1><xsl:value-of select="IDENTI"/></h1>
                        <h3>Imagem</h3>
                        <img src="{IMAGEM/@NOME}" alt="{IMAGEM/@NOME} em falta!"/>
                        
                        <h3>Descrição</h3>
                        <xsl:apply-templates select="DESCRI"/>
                        
                        <h3>Informações de localização</h3>
                        <table class="w3-table">
                            <tr>
                                <th width="10%">Cronologia:</th><td><xsl:value-of select="CRONO"/></td>
                            </tr>
                            <tr>
                                <th>Lugar:</th><td><xsl:value-of select="LUGAR"/></td>
                            </tr>
                            <tr>
                                <th>Freguesia:</th><td><xsl:value-of select="FREG"/></td>
                            </tr>
                            <tr>
                                <th>Concelho:</th><td><xsl:value-of select="CONCEL"/></td>
                            </tr>
                            <tr>
                                <th>Latitude:</th><td><xsl:value-of select="LATITU"/></td>
                            </tr>
                            <tr>
                                <th>Longitude:</th><td><xsl:value-of select="LONGIT"/></td>
                            </tr>
                            <tr>
                                <th>Altitude</th><td><xsl:value-of select="ALTITU"/></td>
                            </tr>                            
                        </table>
                        <hr/>
                        <h3>Acesso</h3>
                        <xsl:apply-templates select="ACESSO"/>
                        <hr/>
                        <h3>Quadro</h3>
                        <xsl:apply-templates select="QUADRO"/>
                        <hr/>
                        <h3>Autor</h3>
                        <xsl:apply-templates select="AUTOR"/>
                        <hr/>
                        <h3>Bibliografia</h3>
                        <xsl:apply-templates select="BIBLIO"/>
                        <hr/>
                        <h3>Deposito</h3>
                        <xsl:apply-templates select="DEPOSI"/>
                        <hr/>
                        <h3>Desenho Arquitetural</h3>
                        <xsl:apply-templates select="DESARQ"/>
                        <hr/>
                        <h3>Interesse</h3>
                        <xsl:apply-templates select="INTERE"/>
                        <hr/>
                        <h3>Interpretação</h3>
                        <xsl:apply-templates select="INTERP"/>
                        <hr/>
                        <h3>Trabalhos no Arquiosítio</h3>
                        <xsl:apply-templates select="TRAARQ"/>
                        <hr/>
                        <h5>Data</h5>
                        <xsl:value-of select="DATA"/>
                        <hr/>
                        <address >
                            <a href="../website.html#{generate-id()}">Voltar à página principal</a>
                        </address>
                        <hr/>
                    </div>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
    <xsl:template match=" ACESSO | QUADRO | AUTOR | BIBLIO | DEPOSI | DESARQ | INTERE | INTERP | TRAARQ">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    
    <xsl:template match="LIGA">
        <xsl:value-of select="."/>
    </xsl:template>
</xsl:stylesheet>