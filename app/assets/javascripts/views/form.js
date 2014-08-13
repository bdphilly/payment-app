Plastiq.Views.PayeeForm = Backbone.CompositeView.extend ({
  template: JST['form'],

  events: {
    'submit': 'createNewPayee',
    'click input[type=radio]': 'handlePlaceholder',
    // 'typeahead:selected': 'handleTypeAheadClick'
  },

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.findFromGoogle);
    this.listenTo(this.collection, 'sync', this.handlePlaceholder);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  createNewPayee: function (event) {
    event.preventDefault();
    var inputName = '';
    var inputAddress = '';

    if (this.$('#business-name').val() === '') {
      inputName = this.$('#person-name').val();
      inputAddress = "Address not provided.";
    } else {
      var businessName = this.$('#business-name').val().split(',');
      inputName = businessName.slice(0, 1).join('');
      inputAddress = businessName.slice(1).join(',');
    }
    if (inputName) {
      this.collection.create({
        name: inputName,
        address: inputAddress,
        rank: this.collection.length
      }, { wait: true });
    }
  },

  // addGoogleAutocomplete: function () {
  //   var input = document.getElementById('business-name');
  //   var options = {
  //     types: ['establishment']
  //   };

  //   autocomplete = new google.maps.places.Autocomplete(input, options);
  // },

  findFromGoogle: function() {
    var service = new google.maps.places.AutocompleteService();

    $('#business-name').typeahead({
      highlight: true,
      },

      {
      source: function(query, callback) {
        service.getPlacePredictions({ 
          input: query,
          types: ['establishment']
        }, 

        function(predictions, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            var predictionOutput = $.map(predictions, function (prediction) {
               var x = { value: prediction.description }
               // var x = prediction.description
               return x
                
            })
            // console.log(predictionOutput)
            callback(predictionOutput)
          }
        });
      },

      templates: {
        suggestion: function (item) {
          var htmlOutput = '<div class="line-one">' + item.value.split(',')[0] + '</div>'
          htmlOutput += '<div class="line-two">' + item.value.split(',').slice(1) + '</div>'
          return htmlOutput;
        },
        footer: "<div class='footer'>No match? That’s ok. Enter any name and click the &nbsp" +
        "<img src=http://s4.postimg.org/e6v1fkje1/arrow.png'> button.</div>",           
      },
    });
    
  },

  handleTypeAheadClick: function (event, suggestion, dataset) {
    debugger
  },

  handlePlaceholder: function () {
    if ($('#business').is(':checked')) {
      $('#person-name').val('');
      $('#person-name').hide();
      $('.twitter-typeahead').show();
      var normalPlaceholder = "What business do you want to pay by card?"
      var focusedPlaceholder = "Enter the name of the business..."
      this.focusedPlaceholder('#business-name', normalPlaceholder, focusedPlaceholder);
    } else {
      $('#business-name').val('');
      $('#business-name').hide();
      $('.twitter-typeahead').hide();
      var normalPlaceholder = "What person do you want to pay by card?"
      var focusedPlaceholder = "Enter the name of the person..."
      this.focusedPlaceholder('#person-name', normalPlaceholder, focusedPlaceholder);
    }
  },

  focusedPlaceholder: function (id, normal, focused) {
    $(id).attr("placeholder",  normal);
    $(id).on('focus', function () {
      $(this).attr('placeholder', focused);
    }).on('blur', function () {
      $(this).attr('placeholder', normal);        
    })
    $(id).show();
  },

});