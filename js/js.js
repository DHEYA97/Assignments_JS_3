var siteName = document.getElementById('siteName')
var siteUrl = document.getElementById('siteUrl')
var regxUrl = /^(https:\/\/[a-z]+||www\.[a-z]+||[a-zA-Z]+)(\.[a-z]{2,7})$/
var regxName = /^[a-zA-Z0-9]{3,}$/
var siteList


if(localStorage.getItem('site') == null)
{
    siteList = []
}
else
{
    siteList = JSON.parse(localStorage.getItem('site'))
    dispalySite()
}

function regxSiteName()
{
    if(regxName.test(siteName.value))
    {
        siteName.classList.add("form-true")
        siteName.classList.remove("form-error")
        document.getElementById("sitename1").style.opacity = 0
        document.getElementById("sitename2").style.opacity = 1
        return true
    }
    else
    {
        siteName.classList.add("form-error");
        siteName.classList.remove("form-true")
        document.getElementById("sitename1").style.opacity = 1
        document.getElementById("sitename2").style.opacity = 0
        return false
    }
}

function regxSiteUrl()
{
    if(regxUrl.test(siteUrl.value))
    {
        siteUrl.classList.add("form-true")
        siteUrl.classList.remove("form-error")
        document.getElementById("siteurl1").style.opacity = 0
        document.getElementById("siteurl2").style.opacity = 1
        return true
    }
    else
    {
        siteUrl.classList.add("form-error");
        siteUrl.classList.remove("form-true")
        document.getElementById("siteurl1").style.opacity = 1
        document.getElementById("siteurl2").style.opacity = 0
        return false
    }
}

function createSite()
{
    var web = {
        sName : siteName.value,
        sUrl : siteUrl.value,
    }
    if(regxSiteName() && regxSiteUrl())
    {
        siteList.push(web)
        localStorage.setItem('site',JSON.stringify(siteList))
        reset()
        dispalySite()
    }
    else
    {
        Swal.fire({
            title: 'Site Name or Url is not valid, Please follow the rules below :',
            html: `<ol class="rules list-unstyled m-0 text-start">
            <li>
              <i class="fa-regular fa-circle-right p-2"></i>Site name must
              contain at least 3 characters
            </li>
            <li>
              <i class="fa-regular fa-circle-right p-2"></i>Site URL must be a
              valid one
            </li>
          </ol>`,
            icon: 'error',
          })
    }
   
}

function dispalySite()
{
    var t = ''
    for(var i = 0 ; i<siteList.length ; i++)
    {
        t += `
            <tr>
                <td>${i+1}</td>
                    <td>${siteList[i].sName}</td>
                    <td>
                        <button class="btn btn-success" onclick="window.open(openurl('${siteList[i].sUrl}'))">
                            <i class="fa-solid fa-eye pe-2"></i>
                            Visit
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-danger pe-2" onclick="DeleteSite(${i})">
                            <i class="fa-solid fa-trash-can"></i>
                            Delete
                            </button>
                    </td>
                </tr>
                `
    }
    document.getElementById('displaysite').innerHTML = t
}
function reset()
{
    siteName.value = ''
    siteUrl.value = ''

    siteName.classList.remove("form-true")
    siteName.classList.remove("form-error")
    document.getElementById("sitename1").style.opacity = 0
    document.getElementById("sitename2").style.opacity = 0
    siteUrl.classList.remove("form-error");
    siteUrl.classList.remove("form-true")
    document.getElementById("siteurl1").style.opacity = 0
    document.getElementById("siteurl2").style.opacity = 0

}

function DeleteSite(index)
{
    siteList.splice(index,1)
    dispalySite()
}

function openurl(snam)
{
    if(snam.startsWith('https:'))
    {
        console.log(snam)
        return snam       
    }
    else
    {
        console.log('https:\\\\' + snam)
        return 'https:\\\\' + snam
    }
}