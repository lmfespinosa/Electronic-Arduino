//Definiciones de comandos AT Para control Robot
String ComandoATLedON = "LED_ON\n";
String ComandoATLedOFF = "LED_OFF\n";

String inputString = "";
boolean stringComplete = false;
//Variable donde almacenaremos el numero aleatorio
long randomNumber;

void setup() {
  // initialize serial:
  Serial.begin(115200);
  // reserve 200 bytes for the inputString:
  inputString.reserve(200);

  Serial.print("Inicio del sistema\n");
  pinMode(13, OUTPUT);

  ConfigTimer1_1second();
}

void loop() {
  // put your main code here, to run repeatedly:

}

void encenderLed(byte led)
  {
    digitalWrite(led, !digitalRead(led));
    }

    
  ISR(TIMER1_COMPA_vect)          
  {
    randomNumber = random(1,100);
   Serial.println("TEMP:"+String(randomNumber));
   //Serial.println("HUM:"+randomNumber);
  //Escribimos el numero aleatorio por el puerto serie
  //Serial.println("TEMP_"+randomNumber);
    randomNumber = random(1,100);
   Serial.println("HUM:"+String(randomNumber));
    
  }


  
void AnalizarTramasATRecibidas(){
  if(inputString == ComandoATLedON){   //Andamos hacia delante
          
               Serial.println("Comando recibido led ON");
               encenderLed(13);
           }
    if(inputString==ComandoATLedOFF){   //Giro delante-izquierda
           
               Serial.println("Comando recibido led OFF");
               encenderLed(13);
           }
    inputString="";
  }



/*
  SerialEvent occurs whenever a new data comes in the
 hardware serial RX.  This routine is run between each
 time loop() runs, so using delay inside loop can delay
 response.  Multiple bytes of data may be available.
 */
void serialEvent() {
  while (Serial.available()) {
    int i = 0;
    // get the new byte:
    char inChar = (char)Serial.read();
    //Serial.println((int)inChar);
    // add it to the inputString:
    inputString += inChar;
    //received[i] = (int)inChar;
    //Serial.println((int)inChar);
    // if the incoming character is a newline, set a flag
    // so the main loop can do something about it:
    i++;
    if (inChar == '\n') {
      stringComplete = true;
      AnalizarTramasATRecibidas();
    }
  }
}


void ConfigTimer1_1second(){
  //deshabilitamos las interrupciones
  noInterrupts();

// configuracion de del Timer1 de 16 bits en modo CTC y prescales de 1024
  TCCR1A = 0;                 
  TCCR1B = 0; 
  TCCR1B |= (1 << WGM12)|(1<<CS10)|(1 << CS12);

//Inicializamos el contador               
  TCNT1  = 0;

// configuramos nuestro registro de comparacion para 1 segundo
  OCR1A = 15624;

//configuramos el desbordamiento             
  TIMSK1 |= (1 << OCIE1A);  

// habiltamos nuestras interrupciones
  interrupts();
  }
