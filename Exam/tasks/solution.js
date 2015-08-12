function solve() {
    var module = (function() {

        var item = (function() {
            var item = Object.create({});
            var itemID = 0;

            Object.defineProperty(item, 'init', {
                value: function(name, description) {
                    this.name = name;
                    this.description = description;
                    this._id = ++itemID;
                    return this;
                }
            });

            Object.defineProperty(item, 'name', {
                get: function() {
                    return this._name;
                },
                set: function(val) {
                    if (typeof val !== 'string' || val.length < 2 || val.length > 40) {
                        throw new Error();
                    }

                    this._name = val;
                }
            });

            Object.defineProperty(item, 'description', {
                get: function() {
                    return this._description;
                },
                set: function(val) {
                    if (typeof val !== 'string' || val === '') {
                        throw new Error();
                    }

                    this._description = val;
                }
            });

            Object.defineProperty(item, 'id', {
                get: function() {
                    return this._id;
                }
            });

            return item;
        }());

        var book = (function(parent) {
            var book = Object.create(parent);

            Object.defineProperty(book, 'init', {
                value: function(name, isbn, genre, description) {
                    parent.init.call(this, name, description);
                    this.isbn = isbn;
                    this.genre = genre;
                    return this;
                }
            });

            Object.defineProperty(book, 'isbn', {
                get: function() {
                    return this._isbn;
                },
                set: function(val) {
                    if ((val.length !== 10 && val.length !== 13) || !(/^\d+$/.test(val))) {
                        throw new Error();
                    }

                    this._isbn = val;
                }
            });

            Object.defineProperty(book, 'genre', {
                get: function() {
                    return this._genre;
                },
                set: function(val) {
                    if (typeof val !== 'string' || val.length < 2 || val.length > 20) {
                        throw new Error();
                    }

                    this._genre = val;
                }
            });

            return book;
        }(item));


        var media = (function(parent) {
            var media = Object.create(parent);

            Object.defineProperty(media, 'init', {
                value: function(name, rating, duration, description) {
                    parent.init.call(this, name, description);
                    this.rating = rating;
                    this.duration = duration;
                    return this;
                }
            });

            Object.defineProperty(media, 'duration', {
                get: function() {
                    return this._duration;
                },
                set: function(val) {
                    if (typeof val !== 'number' || val <= 0) {
                        throw new Error();
                    }

                    this._duration = val;
                }
            });

            Object.defineProperty(media, 'rating', {
                get: function() {
                    return this._rating;
                },
                set: function(val) {
                    if (typeof val !== 'number' || val < 1 || val > 5) {
                        throw new Error();
                    }

                    this._rating = val;
                }
            });
            return media;
        }(item));

        var catalog = (function() {
            var catalog = Object.create({});
            var catalogID = 0;

            Object.defineProperty(catalog, 'init', {
                value: function(name) {
                    this.name = name;
                    this._id = ++catalogID;
                    this.items = [];
                    return this;
                }
            });

            Object.defineProperty(catalog, 'name', {
                get: function() {
                    return this._name;
                },
                set: function(val) {
                    if (typeof val !== 'string' || val.length < 2 || val.length > 40) {
                        throw new Error();
                    }

                    this._name = val;
                }
            });

            Object.defineProperty(catalog, 'id', {
                get: function() {
                    return this._id;
                }
            });

            Object.defineProperty(catalog, 'add', {
                value: function(args) {
                    if (arguments.length === 0) {
                        throw new Error();
                    }

                    if (arguments.length === 1 && Array.isArray(args)) {
                        var arr = args;
                        if (arr.length === 0) {
                            throw new Error();
                        }

                        for (var i = 0; i < arr.length; i += 1) {
                            if (typeof arr[i] !== 'object' || !arr[i].name || !arr[i].description) {
                                throw new Error();
                            }
                        }
                        for (i = 0; i < arr.length; i += 1) {
                            this.items.push(arr[i]);
                        }

                    } else if (arguments.length === 1 && (args.name !== undefined) && (args.description !== undefined)) {
                        this.items.push(args);
                    } else {
                        for (var j = 0; j < arguments.length; j += 1) {
                            if ((!arguments[j].name) || (!arguments[j].description)) {
                                throw new Error();
                            }
                        }
                        for (j = 0; j < arguments.length; j += 1) {
                            this.items.push(arguments[j]);
                        }
                    }
                    return this;
                }
            });

            Object.defineProperty(catalog, 'find', {
                value: function(id) {
                    if (id === null || id === undefined) {
                        throw new Error();
                    }

                    if (typeof id === 'number') {
                        id = +id;
                        if (id < 0) {
                            throw new Error();
                        }

                        for (var i = 0; i < this.items.length; i += 1) {
                            if (this.items[i].id === id) {
                                return this.items[i];
                            }
                        }

                        return null;
                    } else if (typeof id === 'object' && id.name !== undefined && id.id !== undefined) {
                        var result = [];
                        for (var i = 0; i < this.items.length; i += 1) {
                            if ((this.items[i].name === id.name) && (this.items[i].id === id.id)) {
                                result.push(this.items[i]);
                                break;
                            }
                        }

                        return result;
                    } else if (typeof id === 'object' && id.name !== undefined && id.id === undefined) {
                        var result = [];
                        for (var i = 0; i < this.items.length; i += 1) {
                            if (this.items[i].name === id.name) {
                                result.push(this.items[i]);
                            }
                        }

                        return result;
                    } else if (typeof id === 'object' && id.name === undefined && id.id !== undefined) {
                        var result = [];
                        for (var i = 0; i < this.items.length; i += 1) {
                            if (this.items[i].id === id.id) {
                                result.push(this.items[i]);
                                break;
                            }
                        }
                        return result;
                    } else {
                        throw new Error();
                    }
                }
            });

            Object.defineProperty(catalog, 'search', {
                value: function(pattern) {
                    if (typeof pattern !== 'string' || pattern.length < 1) {
                        throw new Error();
                    }

                    pattern = pattern.toLowerCase();
                    return this.items.filter(function(item) {
                        return item.name.toLowerCase().indexOf(pattern) >= 0 || item.description.
                        toLowerCase().indexOf(pattern) >= 0;
                    });
                }
            });

            return catalog;
        }());

        var bookCatalog = (function(parent) {
            var bookCatalog = Object.create(parent);

            Object.defineProperty(bookCatalog, 'init', {
                value: function(name) {
                    parent.init.call(this, name);
                    return this;
                }
            });

            Object.defineProperty(bookCatalog, 'add', {
                value: function(args) {
                    if (arguments.length === 0) {
                        throw new Error();
                    }

                    if (arguments.length === 1 && Array.isArray(args)) {
                        var arr = args;
                        if (arr.length === 0) {
                            throw new Error();
                        }

                        for (var i = 0; i < arr.length; i += 1) {
                            if (!arr[i].genre || !arr[i].isbn) {
                                throw new Error();
                            }
                        }
                        for (i = 0; i < arr.length; i += 1) {
                            this.items.push(arr[i]);
                        }

                    } else if (arguments.length === 1 && (args === undefined || args === null)) {
                        throw new Error();
                    } else if (arguments.length === 1 && (args.isbn !== undefined) && (args.genre !== undefined) && (args.id !== undefined) && (args.name !== undefined)) {
                        this.items.push(args);
                    } else {
                        for (var j = 0; j < arguments.length; j += 1) {
                            if ((!arguments[j].isbn) || (!arguments[j].genre || !arguments[j].id || !arguments[j].name)) {
                                throw new Error();
                            }
                        }
                        for (j = 0; j < arguments.length; j += 1) {
                            this.items.push(arguments[j]);
                        }
                    }
                    return this;

                }
            });

            Object.defineProperty(bookCatalog, 'getGenres', {
                value: function() {
                    var result = [];
                    for (var i = 0; i < this.items.length; i += 1) {
                        result.push(this.items[i].genre);
                    }

                    for (var j = 0; j < result.length - 1; j += 1) {
                        var current = result[j];
                        for (var k = j + 1; k < result.length; k += 1) {
                            if (current === result[k]) {
                                result.splice(k, 1);
                                k--;
                                j--;
                            }
                        }
                    }

                    return result;
                }
            });

            Object.defineProperty(bookCatalog, 'find', {
                value: function(args) {
                    if (args !== undefined && args !== null && args.genre !== undefined && args.id === undefined && args.name === undefined) {
                        var result = [];
                        for (var i = 0; i < this.items.length; i += 1) {
                            if (this.items[i].genre === args.genre) {
                                result.push(this.items[i]);
                            }
                        }
                        return result;
                    } else {
                        return parent.find.call(this, args);
                    }
                }
            });

            return bookCatalog;
        }(catalog));

        var mediaCatalog = (function(parent) {
            var mediaCatalog = Object.create(parent);

            Object.defineProperty(mediaCatalog, 'init', {
                value: function(name) {
                    parent.init.call(this, name);
                    return this;
                }
            });

            Object.defineProperty(mediaCatalog, 'add', {
                value: function(args) {
                    if (arguments.length === 0) {
                        throw new Error();
                    }

                    if (arguments.length === 1 && Array.isArray(args)) {
                        var arr = args;
                        if (arr.length === 0) {
                            throw new Error();
                        }

                        for (var i = 0; i < arr.length; i += 1) {
                            if (typeof arr[i] !== 'object' || !arr[i].name || !arr[i].description) {
                                throw new Error();
                            }
                        }
                        for (i = 0; i < arr.length; i += 1) {
                            this.items.push(arr[i]);
                        }

                    } else if (arguments.length === 1 && (args.name !== undefined) && (args.description !== undefined)) {
                        this.items.push(args);
                    } else {
                        for (var j = 0; j < arguments.length; j += 1) {
                            if ((!arguments[j].name) || (!arguments[j].description)) {
                                throw new Error();
                            }
                        }
                        for (j = 0; j < arguments.length; j += 1) {
                            this.items.push(arguments[j]);
                        }
                    }
                    return this;
                }
            });

            Object.defineProperty(mediaCatalog, 'getTop', {
                value: function(count) {
                    if (typeof count !== 'number') {
                        throw new Error();
                    }
                    if (count < 1) {
                        throw new Error('count must be greater than 1');
                    }
                    if (count > this.items.length) {
                        count = this.items.length;
                    }

                    this.items.sort(function(item1, item2) {
                        return item2.rating - item1.rating;
                    });
                    var result = [];
                    for (var i = 0; i < count; i += 1) {
                        result.push({
                            id: this.items[i].id,
                            name: this.items[i].name
                        });

                    }
                    return result;
                }
            });

            Object.defineProperty(mediaCatalog, 'getSortedByDuration', {
                value: function() {
                    return this.items.sort(function(a, b) {
                        if (a.duration === b.duration) {
                            return a.id - b.id;
                        }
                        return b.duration - a.duration;
                    });
                }
            });

            Object.defineProperty(mediaCatalog, 'find', {
                value: function(args) {
                    if (args !== undefined && args !== null && args.rating !== undefined && args.id === undefined && args.name === undefined) {
                        var result = [];
                        for (var i = 0; i < this.items.length; i += 1) {
                            if (this.items[i].rating === args.rating) {
                                result.push(this.items[i]);
                            }
                        }
                        return result;
                    } else {
                        return parent.find.call(this, args);
                    }
                }
            });

            return mediaCatalog;
        }(catalog));

        var module = {
            getBook: function(name, isbn, genre, description) {
                return Object.create(book).init(name, isbn, genre, description);
            },
            getMedia: function(name, rating, duration, description) {
                return Object.create(media).init(name, rating, duration, description);
            },
            getBookCatalog: function(name) {
                return Object.create(bookCatalog).init(name);
            },
            getMediaCatalog: function(name) {
                return Object.create(mediaCatalog).init(name);
            }
        };

        return module;
    }());

    return module;
}

