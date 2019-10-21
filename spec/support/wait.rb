# The purpose of this module is to allow us to run active
# record expectations in conjunction with Selenium which
# operates in a more asynchronous nature.
# The end goal here is only fail tests that truly don't
# have a record present. Not ones that had their expectation
# around the record ran too early.

# Disabling because I might remove this file soon
# rubocop:disable all
module Wait
  def wait_for_active_record_expectation
    failure = nil

    Timeout.timeout(2) do
      loop until yield == true
    rescue RSpec::Expectations::ExpectationNotMetError => e
      failure = e
      sleep 0.02
      retry
    end
  rescue Timeout::Error
    raise failure
  end
end

RSpec.configure do |config|
  config.include Wait, type: :feature
end
# rubocop:enable all
