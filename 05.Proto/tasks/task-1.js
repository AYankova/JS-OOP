/* Task Description */
/*
 * Create an object domElement, that has the following properties and methods:
 * use prototypal inheritance, without function constructors
 * method init() that gets the domElement type
 * i.e. `Object.create(domElement).init('div')`
 * property type that is the type of the domElement
 * a valid type is any non-empty string that contains only Latin letters and digits
 * property innerHTML of type string
 * gets the domElement, parsed as valid HTML
 * <type attr1="value1" attr2="value2" ...> .. content / children's.innerHTML .. </type>
 * property content of type string
 * sets the content of the element
 * works only if there are no children
 * property attributes
 * each attribute has name and value
 * a valid attribute has a non-empty string for a name that contains only Latin letters and digits or dashes (-)
 * property children
 * each child is a domElement or a string
 * property parent
 * parent is a domElement
 * method appendChild(domElement / string)
 * appends to the end of children list
 * method addAttribute(name, value)
 * throw Error if type is not valid
 * method removeAttribute(attribute)
 * throw Error if attribute does not exist in the domElement
 */


/* Example

var meta = Object.create(domElement)
	.init('meta')
	.addAttribute('charset', 'utf-8');

var head = Object.create(domElement)
	.init('head')
	.appendChild(meta)

var div = Object.create(domElement)
	.init('div')
	.addAttribute('style', 'font-size: 42px');

div.content = 'Hello, world!';

var body = Object.create(domElement)
	.init('body')
	.appendChild(div)
	.addAttribute('id', 'cuki')
	.addAttribute('bgcolor', '#012345');

var root = Object.create(domElement)
	.init('html')
	.appendChild(head)
	.appendChild(body);

console.log(root.innerHTML);
Outputs:
<html><head><meta charset="utf-8"></meta></head><body bgcolor="#012345" id="cuki"><div style="font-size: 42px">Hello, world!</div></body></html>
*/


function solve() {
    var domElement = (function() {
        var domElement = {
            init: function(type) {
                this.type = type;
                this.content = '';
                this.innerHTML = '';
                this.attributes = {};
                this.children = [];
                this.parent = null;

                return this;
            },
            appendChild: function(child) {
                if (typeof(child) !== 'string') {
                    child.parent = this;
                }

                this.children.push(child);

                return this;
            },
            addAttribute: function(name, value) {
                if (name === "" || typeof(name) !== 'string' || !(/^[A-Za-z0-9\-]+$/.test(name))) {
                    throw new Error('Invalid property attibute!');
                }

                this.attributes[name] = value;

                return this;
            },
            removeAttribute: function(attribute) {
                if (this.attributes[attribute]) {
                    delete this.attributes[attribute];
                } else {
                    throw new Error('Non-existing attribute!');
                }

                return this;
            },
            get innerHTML() {
                return getInnerHTML.call(this);

            }
        };

        function getInnerHTML() {
            var result = '<' + this.type,
                attributes = '',
                keys = [],
                child;

            for (var key in this.attributes) {
                keys.push(key);
            }

            keys.sort();

            for (var i = 0; i < keys.length; i += 1) {
                attributes += ' ' + keys[i] + '="' + this.attributes[keys[i]] + '"';
            }

            result += attributes + '>';

            for (var j = 0, len = this.children.length; j < len; j += 1) {
                child = this.children[j];

                if (typeof(child) !== 'string') {
                    result += child.innerHTML;
                } else {
                    result += child;
                }
            }

            result += this.content;
            result += '</' + this.type + '>';

            return result;
        }

        Object.defineProperty(domElement, 'type', {
            get: function() {
                return this._type;
            },
            set: function(value) {
                if (value === "" || !(/^[A-Za-z0-9]+$/.test(value)) || typeof(value) !== 'string') {
                    throw new Error("Type must contain only latin letters and difits!");
                }

                this._type = value;
            }
        });

        Object.defineProperty(domElement, 'content', {
            get: function() {
                if (this.children.length) {
                    return '';
                }

                return this._content;
            },
            set: function(value) {
                this._content = value;
            }

        });

        return domElement;
    }());

    return domElement;
}

module.exports = solve;
