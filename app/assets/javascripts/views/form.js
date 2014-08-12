Plastiq.Views.PayeeForm = Backbone.CompositeView.extend ({
  template: JST['form'],

  events: {
    'submit': 'createNewPayee',
    'click input[type=radio]': 'handlePlaceholder'
  },

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.addGoogleAutocomplete);
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

  addGoogleAutocomplete: function () {
    var input = document.getElementById('business-name');
    var options = {
      types: ['establishment']
    };

    autocomplete = new google.maps.places.Autocomplete(input, options);
  },

  handlePlaceholder: function () {
    if ($('#business').is(':checked')) {
      $('#person-name').val('');
      $('#person-name').hide();
      var normalPlaceholder = "What business do you want to pay by card?"
      var focusedPlaceholder = "Enter the name of the business..."
      this.focusedPlaceholder('#business-name', normalPlaceholder, focusedPlaceholder);
    } else {
      $('#business-name').val('');
      $('#business-name').hide();
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