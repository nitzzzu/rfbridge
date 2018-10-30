# rfbridge

Control your Philips hue lights with a standard RF remote.

## What you need:

- Philips HUE lights and bridge
- [USB_IR_Toy_v2](http://dangerousprototypes.com/docs/USB_IR_Toy_v2)

## Installation

- [Get HUE api username](https://developers.meethue.com/documentation/getting-started)
- Update IR Toy to firmware 24:
    - Find the COM number (Device manager/Ports (COM& LPT)/Usb Serial Device (COMx))
    - Enter bootloader mode: `bootloader.exe [COM port number]`
    - Flash the [firmware](http://dangerousprototypes.com/forum/download/file.php?id=11663): `fw_update -e -w -v -m flash -vid 0x04D8 -pid 0xFD0B -ix USBIRToyv24.hex`
- Install WinLirc, run it, select IRToy plugin and configure it by choosing the correct COM number
- Create new remote config, follow the steps and assign names to buttons
- Winlirc opens port 8765 used by this app

## IR Toy driver installation
- on Windows 10 the driver is already installed
- on Windows 8.1/2012 R2 you must sign the .inf driver before installing:

```
Inf2Cat.exe /driver:. /os:6_3_X86,6_3_X64,Server6_3_X64,8_X64,8_X86,Server8_X64,Server2008R2_X64,7_X64,7_X86,Server2008_X64,Server2008_X86,Vista_X64,Vista_X86,Server2003_X64,Server2003_X86,XP_X64,XP_X86,2000

$cert = New-SelfSignedCertificate -Subject "UsbIrToy" -Type CodeSigningCert -CertStoreLocation cert:\LocalMachine\My
$CertPassword = ConvertTo-SecureString -String “P@ss0wrd” -Force –AsPlainText
Export-PfxCertificate -Cert $cert -FilePath UsbIrToy.pfx -Password $CertPassword

Extract public .cer from UsbIrToy.pfx using mmc

"C:\Program Files (x86)\Windows Kits\10\bin\10.0.17134.0\x64\signtool.exe" sign /f UsbIrToy.pfx /p P@ss0wrd /t http://timestamp.verisign.com/scripts/timstamp.dll /v mchpcdc.cat

Install UsbIrToy.cer in "Trusted Root Certificates" (on the machine where you want to install the signed drivers)

```

https://haukcode.wordpress.com/2015/04/21/how-to-create-a-signed-windows-8-driver-for-usb-ir-toy/
https://docs.microsoft.com/en-us/windows-hardware/drivers/usbcon/usb-driver-installation-based-on-compatible-ids
http://woshub.com/how-to-sign-an-unsigned-driver-for-windows-7-x64/