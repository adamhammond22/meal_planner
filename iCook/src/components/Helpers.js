/* Helpers.js holds helper functions used in multiple areas */

export function formatTags(tagString) {
    if (tagString==null || tagString =='') {
      return '(No Tags)'
    }
    tagArray = tagString.split("@")
    formattedString = 'Tags: '
    firstTag = true
    tagArray.forEach((tag) => {
      if(tag == '') {
        return formattedString
      }
      if(firstTag) {
        formattedString += tag
        firstTag = false
      }
      else {
        formattedString += ' | ' + tag
      }
      
    })
    return formattedString
  }

