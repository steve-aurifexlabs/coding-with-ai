# Python
# Write a python function that uses phonemizer to convert an audio recording into a list of phonemes. It takes the path to a wav file and writes the output as a json file to the same folder.
#
# The function should be called phonemize_wav and take the path to a wav file as input.
#
# The output should be a json file with the same name as the input file, but with the extension .json.
#
# The json file should contain a list of phonemes, where each phoneme is represented as a dictionary with the following keys:
#
# start: start time of the phoneme in seconds (float)
# end: end time of the phoneme in seconds (float)
# phone: the phoneme (string)
# Example:
#
# [{"start": 0.0, "end": 0.1, "phone": "AA"}, {"start": 0.1, "end": 0.2, "phone": "B"}, ...]
# You can use the following code to test your function:
#
# import os
# import json
# from phonemizer.phonemize import phonemize_wav
#
# def test_phonemize_wav():
#     wav_path = os.path.join(os.path.dirname(__file__), 'test.wav')
#     json_path = os.path.join(os.path.dirname(__file__), 'test.json')
#     phonemize_wav(wav_path)
#     with open(json_path) as f:
#         assert json.load(f) == [{'start': 0.0, 'end': 0.1, 'phone': 'AA'}, {'start': 0.1, 'end': 0.2, 'phone': 'B'}]