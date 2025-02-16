import unittest
import document
import hashlib

class TestMyFunction(unittest.TestCase):
    inst = document.Encryption("./hihihi.txt")

    def test_encryption_inst(self):
        self.assertEqual(self.inst.file_path, "./hihihi.txt")

    def test_SHA256(self):
        sha256 = hashlib.sha256()
        with open(self.inst.file_path, "r") as file:
            content = file.read()

        sha256.update(content.encode())
        self.assertEqual(self.inst.encrypt(), sha256.hexdigest())
        print(sha256.hexdigest())

    def test_decrypt(self):
        self.assertEqual(self.inst.decrypt(), "Hi")

if __name__ == '__main__':
    unittest.main()