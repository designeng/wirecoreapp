define ->
    localMachineSign = "http://localhost"
    stackError = null
    stackElementSelector = ".stackTrace"
    combinedRegex = /(?:https?|ftp):\/\/.*?\..*?(?=\W?\s)/g

    afterEach ->
        # how would this work with phantomjs?
        unless window.location.href.indexOf(localMachineSign) == -1
            unless stackError
                
                stackTraceHtml = $(stackElementSelector).html()

                if stackTraceHtml
                    stackError = true

                    container = $(stackElementSelector)

                    container.html("")

                    result = undefined
                    prevLastIndex = 0
                    combinedRegex.lastIndex = 0

                    while (result = combinedRegex.exec(stackTraceHtml))
                        res = result[0]

                        # this feature needed only for developement
                        unless res.indexOf(localMachineSign) == -1
                            # find port 
                            portСolonPos = res.search( /:\d+/ )                        

                            # find first slash after port
                            slashPos = res.slice(portСolonPos).indexOf("/")

                            resSlashInverted = res.slice(portСolonPos + slashPos).replace /\//g, "\\"

                            href = "http://localhost:8877/#!/specReport/" + resSlashInverted
                          
                            # append the text coming before the matched entity
                            container.append $("<span/>").text(stackTraceHtml.slice(prevLastIndex, result.index))     
                            
                            container.append $("<a/>").attr("href", href).text(res)
                          
                            # prevLastIndex will point to the next plain text character to be added
                            prevLastIndex = combinedRegex.lastIndex
                        else
                            # not local machine, teamsity peharps
                            break
                            return

                    container.append $("<span/>").text(stackTraceHtml.slice(prevLastIndex))



