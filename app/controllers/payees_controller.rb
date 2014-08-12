class PayeesController < ApplicationController
  def index
    @payees = Payee.all
    # @payees = @payees.sort_by { |x| x.rank }
    render json: @payees
  end 

  def create
    @payee = Payee.new(payee_params)
    if @payee.save
      render json: @payee
    else
      render json: @payee.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @payee = Payee.find(params[:id])

    if @payee.update_attributes(payee_params)
      render json: @payee
    else
      render json: @payee.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @payee = Payee.find(params[:id])
    @payee.try(:destroy)
    render json: {}
  end

  private
  
  def payee_params
    params.require(:payee).permit(:name, :address, :rank)
  end

end
