# 👉 use "py addons/scripts/reliverse/relimter/python/tasks/save-file-multiple-times.py" instead 👈

import sys
import time

import pyautogui


def press_ctrl_s(times, timeout):
    try:
        time_to_wait = times * timeout
        print(
            "⌛ Starting in 3 seconds... \n🟢 Please set cursor caret to the file which you want to save. \n🔴 Don't click anywhere else until you are notified! \n💡 It takes",
            time_to_wait,
            "seconds to wait (times*timeout).",
        )
        # Short delay to switch to the target window
        time.sleep(3)
        for _ in range(times):
            pyautogui.hotkey("ctrl", "s")
            time.sleep(timeout)
        # Add a short delay to ensure script finishes cleanly
        time.sleep(2)
        print(
            "[@reliverse/addons-relimter/python] save-file-multiple-times task is done"
        )
    except KeyboardInterrupt:
        print("\nKeyboardInterrupt detected. Exiting gracefully...")
    finally:
        # Clean up or finalize any actions here, if needed
        sys.exit()


# Prompt the user to specify the number of times and the timeout
try:
    times_input = input(
        "Enter the number of times to press 'Ctrl+S' (e.g. 60) | (<enter> to choose 60): "
    ).strip()
    timeout_input = input(
        "Enter the timeout between each press (e.g. 0.2 for ms OR e.g. 1 for s) | (<enter> to choose 0.2): "
    ).strip()

    # Set default values if input is empty
    times = int(times_input) if times_input else 60
    timeout = float(timeout_input) if timeout_input else 0.2

except ValueError:
    print("Error: Please enter a valid number.")
    sys.exit(1)

# Validate user inputs
if times <= 0 or timeout <= 0:
    print("Error: Please enter positive numbers for times and timeout.")
    sys.exit(1)

press_ctrl_s(times, timeout)
