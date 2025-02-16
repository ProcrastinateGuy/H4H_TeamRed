import unittest
import pytest
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

    async def my_async_function():
        file_path = os.path.join(UPLOAD_DIRECTORY, file.filename)
        efile_path = os.path.join(UPLOAD_DIRECTORY, "Encrypted.txt")
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            file.file.close() #close the clone file

        tmp = document.Encryption(file_path)
        f = open(efile_path, "w")
        f.write(tmp.encrypt()) # will return an encrypted string of the cloned file
        f.close()


        return {"filename": file.filename, "message": "File uploaded successfully!", "path": file_path}


    @pytest.mark.asyncio
    async def test_my_async_function():
        result = await my_async_function()
        assert result == "result"

if __name__ == '__main__':
    unittest.main()