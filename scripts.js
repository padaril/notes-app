!function(){"use strict";function t(){return t._this||(t._this=this),this.model=new window.app.Model,this.view=new window.app.View,this.controller=new window.app.Controller(this.model,this.view),t._this}var e;t.prototype.init=function(){var t=this;t.controller.renderList()},document.addEventListener("DOMContentLoaded",function(){e=new t,e.init()})}(),function(){"use strict";function t(e,i){var o=this;return t._this||(t._this=o),o.model=e,o.view=i,o.addBtn=document.querySelector(".add-note"),o.noteFilter=document.querySelector(".note-filter"),o.editForm={id:document.querySelector(".edit-note__id"),title:document.querySelector(".edit-note__title"),text:document.querySelector(".edit-note__text"),save:document.querySelector(".edit-note__save"),remove:document.querySelector(".edit-note__remove"),cancel:document.querySelector(".edit-note__cancel")},o.addBtn.addEventListener("click",function(){o.createNote()}),o.noteFilter.addEventListener("keyup",function(){o.renderList()}),o.noteFilter.addEventListener("change",function(){o.saveFilterState()}),o.editForm.save.addEventListener("click",function(){o.onSaveEditNote()}),o.editForm.remove.addEventListener("click",function(){o.onRemoveEditNote()}),o.editForm.cancel.addEventListener("click",function(){o.onCancelEditNote()}),window.addEventListener("focus",function(){o.restoreFilterState(),o.renderList()}),o.restoreFilterState(),t._this}function e(t){t.id.value="",t.title.value="",t.text.value=""}function i(t,e){t.view.renderList(e),t.view.bindListItemClick(function(e){t.editNote(e.getAttribute("data-id"))})}t.prototype.renderList=function(){var t=this;t.model.read().then(function(e){var o=t.noteFilter.value.toUpperCase(),n=e.filter(function(t){var e;return o?(e=t.title.toUpperCase(),-1!==e.indexOf(o)):!0});i(t,n)})},t.prototype.saveFilterState=function(){var t=this;localStorage.notesFilter=JSON.stringify(t.noteFilter.value)},t.prototype.restoreFilterState=function(){var t=this;localStorage.notesFilter&&(t.noteFilter.value=JSON.parse(localStorage.notesFilter))},t.prototype.createNote=function(){var t=this;t.view.showEditForm()},t.prototype.editNote=function(t){var e=this;e.model.read({id:t}).then(function(t){var i;t.length&&(i=t[0],e.editForm.id.value=i.id,e.editForm.title.value=i.title,e.editForm.text.value=i.text),e.view.showEditForm()})},t.prototype.onSaveEditNote=function(){var t,o=this,n={title:o.editForm.title.value,text:o.editForm.text.value};o.editForm.id.value?(n.id=o.editForm.id.value,t=o.model.update(n)):t=o.model.create(n),t.then(function(t){i(o,t),o.view.hideEditForm(),e(o.editForm)})},t.prototype.onRemoveEditNote=function(){var t=this;t.editForm.id.value?t.model["delete"](t.editForm.id.value).then(function(o){i(t,o),t.view.hideEditForm(),e(t.editForm)}):(t.view.hideEditForm(),e(t.editForm))},t.prototype.onCancelEditNote=function(){var t=this;t.view.hideEditForm(),e(t.editForm)},window.app=window.app||{},window.app.Controller=t}(),function(){"use strict";function t(e){return t._this||(t._this=this),this.name="notes",localStorage[this.name]||(localStorage[this.name]=JSON.stringify([])),e&&e.call(this,JSON.parse(localStorage[name])),t._this}t.prototype.create=function(t){var e=this;return new Promise(function(i,o){var n=JSON.parse(localStorage[e.name]);t.id="ID-"+(new Date).getTime(),n.push(t),localStorage[e.name]=JSON.stringify(n),i(n)})},t.prototype.read=function(t){var e=this;return new Promise(function(i,o){var n=JSON.parse(localStorage[e.name]);n=n.filter(function(e){if("object"==typeof t){if(t.id)return t.id===e.id;if(t.title)return-1!==e.title.indexOf(t.title)}return!0}),i(n)})},t.prototype.update=function(t){var e=this;return new Promise(function(i,o){var n=JSON.parse(localStorage[e.name]);if(t.id){for(var r=0;r<n.length;r++)if(n[r].id===t.id){n[r]=t;break}}else o("Data has no ID!");localStorage[e.name]=JSON.stringify(n),i(n)})},t.prototype["delete"]=function(t){var e=this;return new Promise(function(i,o){for(var n=JSON.parse(localStorage[e.name]),r=0;r<n.length;r++)if(n[r].id===t){n.splice(r,1);break}localStorage[e.name]=JSON.stringify(n),i(n)})},window.app=window.app||{},window.app.Model=t}(),function(){"use strict";function t(){return t._this||(t._this=this),this.noteList=document.querySelector(".note-list"),this.editNote=document.querySelector(".edit-note"),this.templates={noteListItem:'<li class="note-list__item" data-id="{{id}}"><article class="note"><h1 class="note__title">{{title}}</h1><p class="note__text">{{text}}</p><article></li>'},t._this}t.prototype.renderList=function(t){var e=this,i=t.map(function(t){return e.buildNoteListItem(t)});this.noteList.innerHTML=i.join("\n")},t.prototype.buildNoteListItem=function(t){var e=this,i=e.templates.noteListItem;return i=i.replace("{{id}}",t.id),i=i.replace("{{title}}",t.title),i=i.replace("{{text}}",t.text)},t.prototype.bindListItemClick=function(t){for(var e=document.querySelectorAll(".note-list__item"),i=0,o=e.length;o>i;i++)e[i].addEventListener("click",function(){t(this)})},t.prototype.showEditForm=function(){var t=this;t.editNote.classList.add("m-show")},t.prototype.hideEditForm=function(){var t=this;t.editNote.classList.remove("m-show")},window.app=window.app||{},window.app.View=t}();