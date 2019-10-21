class ServiceBase < ActiveInteraction::Base
  def failure_status
    422
  end

  def validate_and_save(model_object)
    errors.merge!(model_object.errors) unless model_object.save
    Hash[model_object.model_name.param_key, model_object]
  end
end
