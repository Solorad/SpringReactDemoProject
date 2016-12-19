function ajax({ url, method = 'GET', onSuccess, onFail }) {
  const request = new XMLHttpRequest();

  request.onreadystatechange = () => {
    if (request.readyState === XMLHttpRequest.DONE) {
      const result = getResult();
      switch (request.status) {
        case 200: onSuccess(result); break;
        case 400: onFail(request.responseText); break;
      }
    }
  };

  request.open('GET', url, true);
  request.send();
}

ajax.get = (url, onSuccess) => {
  // return getResult();

  return ajax({ url, onSuccess });
};



function getResult() {
  return {
  "_embedded" : {
    "books" : [ {
      "title" : "Lord of the rings",
      "authors" : [ "J.R.R. Tolkien" ],
      "description" : "Description",
      "pageNumber" : 2300,
      "likeNumber" : 3,
      "totalStars" : null,
      "scoreCount" : null,
      "publishDate" : null,
      "_links" : {
        "self" : {
          "href" : "http://localhost:9090/api/books/5844979902922751e6a3fee5"
        },
        "book" : {
          "href" : "http://localhost:9090/api/books/5844979902922751e6a3fee5"
        }
      }
    }, {
      "title" : "War and Peace",
      "authors" : [ "L.N. Tolstoy" ],
      "description" : "Description",
      "pageNumber" : 1200,
      "likeNumber" : 1,
      "totalStars" : null,
      "scoreCount" : null,
      "publishDate" : null,
      "_links" : {
        "self" : {
          "href" : "http://localhost:9090/api/books/5844979902922751e6a3fee6"
        },
        "book" : {
          "href" : "http://localhost:9090/api/books/5844979902922751e6a3fee6"
        }
      }
    }, {
      "title" : "Catcher in the rye",
      "authors" : [ "J. D. Salinger" ],
      "description" : "Description",
      "pageNumber" : 1000,
      "likeNumber" : 2,
      "totalStars" : null,
      "scoreCount" : null,
      "publishDate" : null,
      "_links" : {
        "self" : {
          "href" : "http://localhost:9090/api/books/5844979902922751e6a3fee7"
        },
        "book" : {
          "href" : "http://localhost:9090/api/books/5844979902922751e6a3fee7"
        }
      }
    } ]
  },
  "_links" : {
    "first" : {
      "href" : "http://localhost:9090/api/books?page=0&size=3"
    },
    "self" : {
      "href" : "http://localhost:9090/api/books"
    },
    "next" : {
      "href" : "http://localhost:9090/api/books?page=1&size=3"
    },
    "last" : {
      "href" : "http://localhost:9090/api/books?page=2&size=3"
    },
    "profile" : {
      "href" : "http://localhost:9090/api/profile/books"
    }
  },
  "page" : {
    "size" : 3,
    "totalElements" : 8,
    "totalPages" : 3,
    "number" : 0
  }
};
}


export default ajax;
