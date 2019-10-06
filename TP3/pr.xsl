<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    <xsl:output method="xhtml" indent="yes" encoding="UTF-8"/>
        <xsl:template match="/">
            <xsl:result-document href="pr.html">
            <html>
                <head>
                    <title>
                        Project-Record 
                    </title>
                    <meta charset="UTF8"/>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/> 
                </head>
                <body>
                    <xsl:apply-templates/>
                </body>
            </html>
            </xsl:result-document>
        </xsl:template>
        
        <xsl:template match="pr">
            <div class="w3-container" > 
                <h1 class="w3-center">Project Record</h1>  
            </div>
            <xsl:apply-templates/>
        </xsl:template>
        
        <xsl:template match="metadata">
            <div class="w3-container">
                <hr/>
                <table class="w3-table">
                    <tr>
                        <td><b>KEY NAME: </b><xsl:value-of select="keyname"/></td>                      
                    </tr>
                    <tr>
                        <td><b>TITLE: </b><xsl:value-of select="title"/></td> 
                    </tr>
                    <xsl:choose>
                        <xsl:when test="string(subtitle)">
                            <tr>
                                <td><b>SUBTITLE: </b><xsl:value-of select="subtitle"/></td>
                            </tr>
                        </xsl:when>
                    </xsl:choose>
                    <tr>
                        <td><b>BEGIN DATE: </b><xsl:value-of select="bdate"/></td>
                    </tr>
                    <tr>                      
                        <td><b>End Date: </b><xsl:value-of select="edate"/></td>
                    </tr>
                    <tr>
                        <td><b>SUPERVISOR: </b><a href="{supervisor/@homepage}"><xsl:value-of select="supervisor"/></a></td>
                    </tr>
                </table>
                <hr/>
            </div>
        </xsl:template>
        
        <xsl:template match = "workteam">
            <div class="w3-container">
                <h2>Workteam</h2>
                <table class="w3-table w3-striped">
                    <tr>
                        <th>Identifier</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Git</th>
                    </tr>
                    <xsl:apply-templates/>
                </table>
                <hr/>
            </div>
        </xsl:template>
        
        <xsl:template match = "worker">
           <tr>
               <td><xsl:value-of select="identifier"/></td>
               <td><xsl:value-of select="name"/></td>
               <td><xsl:value-of select="email"/></td>
               <td><xsl:choose>
                   <xsl:when test="string(git)">
                       <xsl:value-of select="git"/>
                   </xsl:when>
                   <xsl:otherwise>
                       não fornecido
                   </xsl:otherwise>
               </xsl:choose>
               </td>
           </tr>
        </xsl:template>
        
        <xsl:template match = "abstract">
           <div class="w3-container">
               <h2>Abstract</h2>
               <xsl:apply-templates/>
               <hr/>
           </div>
        </xsl:template>
        
        <xsl:template match="p">
           <p><xsl:apply-templates/></p>
        </xsl:template>
        
        <xsl:template match="i">
           <i><xsl:apply-templates/></i>
        </xsl:template>
        
        <xsl:template match="b">
            <b><xsl:apply-templates/></b>
        </xsl:template>
        
        <xsl:template match="xref">
           <a href="{@url}"><xsl:value-of select="."/></a>
        </xsl:template>
        
        <xsl:template match="deliverables">
            <div class="w3-container">
                <h2>Deliverables</h2>
                <ol>
                <xsl:apply-templates/>
                </ol>
                <hr/>
            </div>
        </xsl:template>
        
        <xsl:template match="deliverable">
            <li><a href="{@path}"><xsl:value-of select="."/></a></li>
        </xsl:template>
</xsl:stylesheet>